import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});





export const sendResetEmail = async (toEmail, resetLink) => {

     const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    await transporter.sendMail({
        from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Password Reset Request",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #111827; padding: 30px; color: white;">
                <h2 style="color: #5DCEA6;">Lost & Found - Password Reset</h2>
                <p>You requested a password reset. Click the button below to reset your password.</p>
                <p>This link expires in <strong>15 minutes</strong>.</p>
                <a href="${resetLink}" 
                   style="display:inline-block; background-color:#5DCEA6; color:#000; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; margin-top:10px;">
                    Reset Password
                </a>
                <p style="margin-top:20px; color:#9ca3af; font-size:12px;">
                    If you didn't request this, ignore this email.
                </p>
            </div>
        `
    });
};