import express from "express";
import UpdateController from "../../controllers/update.js";
import {verifyJwtToken} from "../../helpers/jwtHandler.js"

const router = express.Router();

// Ruta para actualizar un usuario específico por su ID
//quite el userId para que sea mas facil manejarlo por el fronr
router.put("/",verifyJwtToken ,UpdateController.updateUser);

export default router;
