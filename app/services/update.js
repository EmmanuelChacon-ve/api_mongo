import User from "../models/User.js";

const UpdateService = {
  async updateUser(userId, userData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          full_name: userData.full_name,
          numero: userData.numero,
        },
        { new: true }
      );

      if (!updatedUser) {
        const error = new Error(`Usuario con ID ${userId} no encontrado`);
        error.statusCode = 404;
        throw error;
      }
      console.log("aquii"+updatedUser)
      return updatedUser;
    } catch (err) {
      throw err;
    }
  },
};

export default UpdateService;
