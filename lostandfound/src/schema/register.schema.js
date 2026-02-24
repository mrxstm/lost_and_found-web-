import z from "zod";
export const registerSchema = z.object({
    fullname: z
    .string()
    .nonempty({message: "Fullname cannot be empty"})
    .min(3, {message: "Name must be atleast 3 characters"})
    .regex(/^[A-Za-z\s]+$/, {message: "Name can only contain letters"}),


    username: z
    .string()
    .nonempty({message: "Username cannot be empty"})
    .min(4, {message:"Username must be at least 4 characters"})
    .regex(/^[a-zA-Z0-9_]+$/, {message:"Only letters, numbers & underscore allowed"}),

    email: z
    .string()
    .nonempty({message: "Email cannot be empty"})
    // .min(150, {message: "Email length exceeded"})
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message: "Invalid email address"}),

    phone_no: z
    .string() 
    .nonempty({message: "Phone number cannot be empty"})
    .regex(/^(97|98)[0-9]{8}$/, {message: "Enter a valid phone number"}),

    password: z
    .string()
    .nonempty({message: "Password cannot be empty"})
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Must include upper, lower, number & special character"
    ),

    gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" })
    }),

    college: z
    .string()
    .nonempty({message: "College cannot be empty"})
    .min(1, "College is required")

})

export const loginSchema = z.object({
    email: z
    .string()
    .nonempty({message: "Email cannot be empty"}),
 
    
    password: z
    .string()
    .nonempty({message: "Password cannot be empty"})

})