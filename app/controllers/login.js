// controllers/login.js
import LoginService from "../services/login.js";

const LoginController = {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await LoginService.authenticateUser(
        email,
        password
      );

      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",

        data: { user, token },
      });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);

      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Credenciales inválidas",

        error: {
          message: err.message || "Error desconocido",
          status: err.statusCode || 500,
        },
      });
    }
  },
};

export default LoginController;
