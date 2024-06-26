// routes/role.js

import express from "express";
import RoleController from "../../controllers/role.js";

const router = express.Router();

router.get("/", RoleController.getAllRoles);

export default router;
