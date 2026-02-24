import multer from "multer";
import path from "path";

// Function to create storage for a specific folder
const createStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder); // e.g., "uploads/items" or "uploads/profiles"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
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
  storage: createStorage("uploads/items"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadProfileImage = multer({
  storage: createStorage("uploads/profiles"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export { uploadItemImages, uploadProfileImage };