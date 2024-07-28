import Admin from "../models/admin.model.js";
import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { password, email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ msg: "Admin login successfully", admin, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    const createdBy = req.admin.id;
    const employee = new Employee({
      name,
      username,
      password,
      createdBy,
      email,
    });
    await employee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
