import RegisterService from "../services/register.js";
import path from "path";

const RegisterController = {
  async registerUser(req, res) {
    try {
      const userData = {
        ...req.body,
        image: req.file ? path.join("/uploads", req.file.filename) : undefined,
      };
      const newUser = await RegisterService.createUser(userData);
      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: newUser,
      });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.statusCode ? err.message : "Error al registrar usuario",
        error: {
          message: err.message || "Error desconocido",
          status: err.statusCode || 500,
        },
      });
    }
  },
};

export default RegisterController;
