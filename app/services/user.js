import User from "../models/User.js";

const UserService = {
  async getAllUsers() {
    // Usamos populate para rellenar los detalles del rol
    const users = await User.find().populate("roles.role_id", "name_rol");
    return users;
  },
};

export default UserService;
