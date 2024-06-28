// routes/index.js
import express from "express";
import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as path from "path";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

const loadDynamicRoutes = async () => {
  try {
    const versionToUse = process.env.ROUTE_VERSION || "v1"; // Definir la versión de rutas desde .env o por defecto
    const directoryPath = path.join(__dirname, versionToUse);
    const directoryExists = await fs
      .access(directoryPath)
      .then(() => true)
      .catch(() => false);

    if (!directoryExists) {
      console.log(`El directorio '${versionToUse}' no existe o está vacío.`);
      return (req, res, next) => {
        next();
      };
    }

    const files = await fs.readdir(directoryPath);
    for (const file of files) {
      if (file.endsWith(".js")) {
        const routePath = `/${file.split(".")[0]}`;
        const { default: route } = await import(
          `file://${path.join(directoryPath, file)}`
        );
        router.use(routePath, route);
      }
    }

    return router;
  } catch (err) {
    console.error("Error al cargar rutas dinámicas:", err);
    return (req, res, next) => {
      next();
    };
  }
};

export default loadDynamicRoutes;
