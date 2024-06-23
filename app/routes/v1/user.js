// routes/index.js
import express from "express";
import UserController from "../../controllers/user.js"; // Asegúrate de tener la ruta correcta al controlador

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", UserController.getAllUsers);

export default router;
