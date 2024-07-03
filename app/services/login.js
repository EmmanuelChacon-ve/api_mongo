// services/login.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let activeTokens = new Map();

const LoginService = {
  async authenticateUser(email, password) {
    const user = await User.findOne({ email }).populate("roles.role_id");

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

    // Log para verificar los roles del usuario
    console.log("Roles del usuario:", user.roles);

    if (
      !user.roles ||
      user.roles.length === 0 ||
      !user.roles[0].role_id ||
      !user.roles[0].role_id.name_rol
    ) {
      const error = new Error("Rol del usuario no encontrado");
      error.statusCode = 500;
      throw error;
    }

    const rol = user.roles[0].role_id.name_rol;
    const token = jwt.sign(
      { userId: user._id, email: user.email, rol: rol.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { user, token };
  },

  logoutUser(userId) {
    activeTokens.delete(userId);
  },

  isTokenActive(userId) {
    return activeTokens.has(userId);
  },
};

export default LoginService;
