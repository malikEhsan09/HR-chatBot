import express from "express";
import { createEmployee, loginAdmin } from "../controllers/admin.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/createEmployee", protectAdmin, createEmployee);

export default router;
