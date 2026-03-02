import fs from "fs";
import path from "path";

const createUploadsFolders = () => {
  const baseDir = path.join(".", "uploads");
  const subDirs = ["items", "profiles"];

  // Ensure base uploads folder exists
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
    console.log("Uploads folder created.");
  }

  // Ensure subfolders exist
  subDirs.forEach((folder) => {
    const dirPath = path.join(baseDir, folder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      console.log(`Uploads subfolder created: ${folder}`);
    }
  });
};

export { createUploadsFolders };