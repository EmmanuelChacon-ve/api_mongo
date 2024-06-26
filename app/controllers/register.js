import RegisterService from "../services/register.js";

const RegisterController = {
  async registerUser(req, res) {
    try {
      const newUser = await RegisterService.createUser(req.body);
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
