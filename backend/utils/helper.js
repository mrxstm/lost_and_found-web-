import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createCloudinaryStorage = (folder) => new CloudinaryStorage({
    cloudinary,
    params: {
        folder: `lostandfound/${folder}`,
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        transformation: [{ width: 800, crop: "limit" }]
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed!"), false);
    }
};

const uploadItemImages = multer({
    storage: createCloudinaryStorage("items"),
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

const uploadProfileImage = multer({
    storage: createCloudinaryStorage("profiles"),
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

const uploadProofImage = multer({
    storage: createCloudinaryStorage("proofs"),
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

export { uploadItemImages, uploadProfileImage, uploadProofImage };