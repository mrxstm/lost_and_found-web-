import z from "zod";
export const itemSchema = z.object({

    itemname: z
    .string()
    .nonempty({message: "Item name cannot be empty"})
    .min(3, {message: "Name must be atleast 3 characters"}),

    category: z
    .string()
    .nonempty({ message: "Category is required" })
    .refine(
    (val) => ["Electronics", "Keys", "Purse", "Documents", "Clothing", "Books", "Bags", "Other"].includes(val),
    { message: "Invalid category" }),

    status: z
    .string()
    .nonempty({message: "Status cannot be empty"}),

    location: z
    .string()
    .nonempty({message: "Location cannot be empty"}),

    description: z
    .string()
    .nonempty({message: "Description cannot be empty"}),

    date: z
    .string()
    .nonempty({ message: "Date cannot be empty" })
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
    .refine(val => new Date(val) <= new Date(), { message: "Date cannot be in the future" }),

   image_files: z
    .array(z.instanceof(File)) // Each item must be a File object
    .min(1, { message: "At least one image is required" })
    .max(4, { message: "You can upload at most 4 images" })
    .refine(files => files.every(file => file.size <= 5 * 1024 * 1024), { message: "Each file must be <= 5MB" })
    .refine(files => files.every(file => ["image/jpeg","image/png"].includes(file.type)), { message: "Only PNG/JPG allowed" }),


})