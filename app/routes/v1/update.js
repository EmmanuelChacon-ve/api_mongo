import express from "express";
import UpdateController from "../../controllers/update.js";

const router = express.Router();

// Ruta para actualizar un usuario específico por su ID
router.put("/:userId", UpdateController.updateUser);

export default router;
