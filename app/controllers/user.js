// controllers/user.js

import UserService from "../services/user.js";

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      /* console.log(
        `Usuarios obtenidos correctamente. Código de estado: ${res.statusCode}`
      ); */
      res.status(200).json(users); // Enviar respuesta con código 200 y usuarios
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      console.log(
        `Error al obtener usuarios. Código de estado: ${res.statusCode}`
      );
      res.status(500).json({ error: "Error al obtener usuarios" }); // Enviar respuesta con código 500 en caso de error
    }
  },
};

export default UserController;
