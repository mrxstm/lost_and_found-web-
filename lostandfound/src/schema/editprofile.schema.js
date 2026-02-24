import z from "zod";


// Validation schema for edit profile
export const editProfileSchema = z.object({
  fullname: z
    .string()
    .nonempty({ message: "Fullname cannot be empty" })
    .min(3, { message: "Name must be at least 3 characters" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name can only contain letters" }),
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email address" }),
  phone_no: z
    .string()
    .nonempty({ message: "Phone number cannot be empty" })
    .regex(/^(97|98)[0-9]{8}$/, { message: "Enter a valid phone number" }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
});