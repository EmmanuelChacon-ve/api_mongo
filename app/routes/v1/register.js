// Ejemplo en el archivo de rutas (por ejemplo, register.js)
import express from "express";
import RegisterController from "../../controllers/register.js";
import { upload } from "../../config/multerConfig.js";

const router = express.Router();

// Ruta para registrar un usuario con subida de imagen
router.post("/", upload.single("image"), RegisterController.registerUser);

export default router;
