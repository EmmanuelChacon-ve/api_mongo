// routes/index.js
import express from "express";
import registerRoutes from "./register.js";

const router = express.Router();

export default (upload) => {
  router.use("/register", registerRoutes(upload));
  return router;
};
