import RegisterService from "../services/register.js";

const RegisterController = {
  async registerUser(req, res) {
    try {
      const newUser = await RegisterService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      if (err.statusCode) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Error al registrar usuario" });
      }
    }
  },
};

export default RegisterController;
