// multerConfig.js
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración de Multer para la subida de archivos
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

export { upload };
