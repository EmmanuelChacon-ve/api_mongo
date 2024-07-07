// services/delete.js
import User from "../models/User.js";

const DeleteUserService = {
  async deleteUserById(userId) {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return user;
  },
};

export default DeleteUserService;
