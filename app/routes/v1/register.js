import express from "express";
import RegisterController from "../../controllers/register.js";

const registerRoutes = (upload) => {
  const router = express.Router();

  // Ruta para registrar un usuario con subida de imagen
  router.post("/", upload.single("image"), RegisterController.registerUser);

  return router;
};

export default registerRoutes;
