// services/login.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let activeTokens = new Map();

const LoginService = {
  async authenticateUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 401;
      throw error;
    }

    if (user.password !== password) {
      const error = new Error("Contraseña incorrecta");
      error.statusCode = 401;
      throw error;
    }

    // Si no estamos manejando tokens activos, omitimos esta parte

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  },

  // Método para cerrar sesión (eliminar el token activo)
  logoutUser(userId) {
    activeTokens.delete(userId);
  },

  // Método para verificar si un token está activo (opcional)
  isTokenActive(userId) {
    return activeTokens.has(userId);
  },
};

export default LoginService;
