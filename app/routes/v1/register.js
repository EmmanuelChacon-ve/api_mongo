// routes/index.js
import express from "express";
import RegisterController from "../../controllers/register.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.post("/", RegisterController.registerUser);

export default router;
