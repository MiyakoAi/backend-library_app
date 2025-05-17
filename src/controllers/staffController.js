import { Staff } from "../models/dbModel.js";

// GET all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single staff
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff tidak ditemukan" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE staff
export const createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff tidak ditemukan" });
    await staff.update(req.body);
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff tidak ditemukan" });
    await staff.destroy();
    res.json({ message: "Staff berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
