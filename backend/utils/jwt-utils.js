import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    const options = { expiresIn: "1h" };
    
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env");
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}
