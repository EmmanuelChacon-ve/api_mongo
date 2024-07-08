// routes/v1/user.js
import express from "express";
import deleteUserController from "../../controllers/delete.js";
import { verifyJwtToken } from "../../helpers/jwtHandler.js";

const router = express.Router();

// Ruta para eliminar un usuario por ID
router.delete("/:id",verifyJwtToken,deleteUserController.deleteUser);

export default router;
