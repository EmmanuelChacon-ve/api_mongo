// services/role.js

import Role from "../models/role.js";

const RoleService = {
  async getAllRoles() {
    return await Role.find();
  },
};

export default RoleService;
