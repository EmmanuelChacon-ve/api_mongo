// controllers/login.js
import LoginService from "../services/login.js";
import {dirname,join} from "node:path"
import { basename } from "node:path";

const LoginController = {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      let { user : dataToReturn, token } = await LoginService.authenticateUser(
        email,
        password
      );
      dataToReturn.image = basename(dataToReturn.image);
      res.cookie('access_token',token,
        {
          httpOnly: true,//la cookie solo se puede acceder en el servidor
          secure: true,   //la cookie solo se puede acceder en https
          sameSize: 'strict' //la cookie solo se puede acceder en el mismo dominio
        }).status(201).json(
          {
            success: true,
            message: 'inicio de session exitoso',
            data: dataToReturn,
            token:token
          })
    } catch (err) {
      console.error("Error al iniciar sesión:", err);

      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Credenciales inválidas",

        error: {
          message: err.message || "Error desconocido",
          status: err.statusCode || 500,
        },
      });
    }
  },
};export default LoginController;