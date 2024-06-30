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
    //obteninedo el name del rol para saber que permisos posee
    const {role_name : rol} = user.roles.at(0);
    const token = jwt.sign(
      { userId: user._id, email: user.email, rol: rol.toLowerCase() },
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
