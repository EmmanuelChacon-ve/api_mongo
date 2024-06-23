// services/login.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Esta variable almacenará los tokens activos en memoria
let activeTokens = new Map();

const LoginService = {
  async authenticateUser(email, password) {
    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Comparar la contraseña en texto plano (en una implementación real, deberías usar bcrypt para comparar contraseñas seguras)
    if (user.password !== password) {
      throw new Error("Contraseña incorrecta");
    }

    // Verificar si el usuario ya tiene un token activo
    if (activeTokens.has(user._id)) {
      // Obtener el token activo
      const activeToken = activeTokens.get(user._id);

      try {
        // Verificar si el token sigue siendo válido
        jwt.verify(activeToken, process.env.JWT_SECRET);
        // Si el token es válido, lanzar un error indicando sesión activa
        throw new Error("El usuario ya tiene una sesión activa");
      } catch (error) {
        // Si el token no es válido, eliminarlo de la lista de tokens activos
        activeTokens.delete(user._id);
      }
    }

    // En este punto, la autenticación fue exitosa
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Guardar el nuevo token en la lista de tokens activos
    activeTokens.set(user._id, token);

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
