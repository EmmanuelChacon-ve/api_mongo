// controllers/user/delete.js
import DeleteUserService from "../services/delete.js";
import {hasPermission} from "../helpers/permissionHandler.js"

const deleteUserController = {
  async deleteUser(req, res) {
    try {
    const {rol} = req.userInformation;
      if(!hasPermission('delete',rol))
        {
          return res.status(400).json(
            {
              success: false,
              message: 'El usuario no posee permisos para esta accion',
              data: undefined
            })
        }
      const userId = req.params.id;
      await DeleteUserService.deleteUserById(userId);

      res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente",
      });
    } catch (err) {
      console.error("Error al eliminar usuario:", err);

      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Error al eliminar usuario",
        error: {
          message: err.message || "Error desconocido",
          status: err.statusCode || 500,
        },
      });
    }
  },
};

export default deleteUserController;
