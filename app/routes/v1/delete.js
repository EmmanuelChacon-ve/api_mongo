// routes/v1/user.js
import express from "express";
import deleteUserController from "../../controllers/delete.js";

const router = express.Router();

// Ruta para eliminar un usuario por ID
router.delete("/:id", deleteUserController.deleteUser);

export default router;
