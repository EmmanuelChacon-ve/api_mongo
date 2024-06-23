import User from "../models/User.js";
import Role from "../models/role.js"; // Importa tu modelo de roles

const RegisterService = {
  async createUser(userData) {
    // Busca el rol por name_rol
    const role = await Role.findOne({ name_rol: userData.role_name });

    if (!role) {
      const error = new Error(
        `El rol ${userData.role_name} no ha sido encontrado`
      );
      error.statusCode = 400; // Código de estado 400 para errores de validación
      throw error;
    }

    // Crea el usuario con el role_id y status del rol encontrado
    const newUser = new User({
      full_name: userData.full_name,
      email: userData.email,
      numero: userData.numero,
      image: userData.image,
      password: userData.password,
      status: "A", // Status siempre es "A"
      roles: [
        {
          role_id: role._id,
          role_name: role.name_rol,
          status: "A",
        },
      ],
    });

    await newUser.save();

    // Convertir el nuevo usuario a un objeto y eliminar __v
    const userWithoutVersion = newUser.toObject();
    delete userWithoutVersion.__v;

    return userWithoutVersion;
  },
};

export default RegisterService;
