// index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js"; // Importar la función de conexión a MongoDB
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan"; // Middleware de registro de solicitudes HTTP
import dynamicRoutes from "./app/routes/index.js"; // Importar la función para cargar las rutas dinámicas
import cookieParser from "cookie-parser";

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware de registro de solicitudes HTTP
app.use(morgan("dev"));

// Conectar a MongoDB
connectDB();
app.use('/static',express.static(path.join(__dirname,'uploads')))
// Montar las rutas dinámicas en la aplicación
const versionToUse = process.env.ROUTE_VERSION || "v1";
app.use(`/${versionToUse}`, dynamicRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
