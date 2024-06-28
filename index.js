import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js"; // Importar la función de conexión a MongoDB
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan"; // Middleware de registro de solicitudes HTTP
import multer from "multer"; // Importar multer
import dynamicRoutes from "./app/routes/v1/index.js"; // Importar las rutas dinámicas desde routes/index.js

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con un timestamp
  },
});
const upload = multer({ storage });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de registro de solicitudes HTTP
app.use(morgan("dev"));

// Conectar a MongoDB
connectDB();

// Servir archivos estáticos (para las imágenes subidas)
app.use("/uploads", express.static("uploads"));

// Montar las rutas dinámicas en la aplicación
const versionToUse = process.env.ROUTE_VERSION || "v1";
app.use(`/${versionToUse}`, dynamicRoutes(upload));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
