import UpdateService from "../services/update.js";

const UpdateController = {
  async updateUser(req, res) {
    const userId = req.params.userId; // Suponiendo que el userId está en los parámetros de la URL
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
