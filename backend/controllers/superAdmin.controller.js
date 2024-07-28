import SuperAdmin from "../models/superAdmin.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ? Create super admin controller
export const createSuperAdmin = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const superAdmin = new SuperAdmin({ username, password, email });
    await superAdmin.save();
    res.status(201).json({ message: "SuperAdmin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ? Login controller for super admin
export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: superAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ msg: "Login successfully", superAdmin, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ? Create admin controller
export const createAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const createdBy = req.superAdmin.id;
    const admin = new Admin({ username, password, createdBy, email });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
