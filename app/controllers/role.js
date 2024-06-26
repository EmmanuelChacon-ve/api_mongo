// controllers/role.js

import RoleService from "../services/role.js";

const RoleController = {
  async getAllRoles(req, res) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json({
        success: true,
        message: "Roles obtenidos correctamente",
        status: 200,
        data: roles,
      });
    } catch (err) {
      console.error("Error al obtener roles:", err);
      res.status(500).json({
        success: false,
        message: "Error al obtener roles",
        status: 500,
        error: { message: err.message || "Error desconocido" },
      });
    }
  },
};

export default RoleController;
