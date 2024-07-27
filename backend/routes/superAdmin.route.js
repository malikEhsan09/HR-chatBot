import express from "express";
import {
  createAdmin,
  createSuperAdmin,
  loginSuperAdmin,
} from "../controllers/superAdmin.controller.js";
import { protectSuperAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createSuperAdmin);
router.post("/login", loginSuperAdmin);
router.post("/createAdmin", protectSuperAdmin, createAdmin);

export default router;
