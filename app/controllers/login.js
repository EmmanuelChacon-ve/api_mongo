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

      res.status(200).json({ user, token });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  },
};

export default LoginController;
