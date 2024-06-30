import UpdateService from "../services/update.js";
import {hasPermission} from "../helpers/permissionHandler.js"

const UpdateController = {
  async updateUser(req, res) {
    const {userId,rol} = req.userInformation;
    if(!hasPermission('Update',rol))
      {
        return res.status(400).json(
          {
            success: false,
            message: 'El usuario no posee permisos para esta accion',
            data: undefined
          })
      }
    const { full_name, numero } = req.body;

    try {
      const updatedUser = await UpdateService.updateUser(userId, {
        full_name,
        numero,
      });

      res.status(200).json({
        success: true,
        message: "Usuario actualizado exitosamente",
        data: updatedUser,
      });
    } catch (err) {
      console.error("Error al actualizar usuario:", err);

      res.status(err.statusCode || 500).json({
        success: false,
        message: err.statusCode ? err.message : "Error al actualizar usuario",
        error: {
          message: err.message || "Error desconocido",
          status: err.statusCode || 500,
        },
      });
    }
  },
};

export default UpdateController;
