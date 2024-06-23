// routes/login.js
import express from "express";
import LoginController from "../../controllers/login.js";

const router = express.Router();

// Ruta para iniciar sesión
router.post("/", LoginController.loginUser);

export default router;
