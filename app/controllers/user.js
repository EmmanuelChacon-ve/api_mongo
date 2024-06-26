// controllers/user.js

import UserService from "../services/user.js";

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        message: "Usuarios obtenidos correctamente",
        data: users,
      });
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      res.status(500).json({
        success: false,
        message: "Error al obtener usuarios",
        error: { message: err.message || "Error desconocido", status: 500 },
      });
    }
  },
};

export default UserController;
