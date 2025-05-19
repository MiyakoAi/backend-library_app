import { Staff, User } from "../models/dbModel.js";

// mendapatkan semua data staff
export const getAllStaff = async (req, res) => {
  try {
    const data = await Staff.findAll({ include: [User] });
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// mendapatkan data staff berdasarkan id
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id, { include: [User] });
    if (!staff) return res.status(404).json({ msg: "Staff tidak ditemukan" });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// menambahkan data staff
export const createStaff = async (req, res) => {
  try {
    const { username, password, nama_staff, jabatan_staff, no_tel_staff } = req.body;

    const user = await User.create({ username, password, role: "staff" });
    const staff = await Staff.create({
      id_user: user.id,
      nama_staff,
      jabatan_staff,
      no_tel_staff
    });

    res.status(201).json({ msg: "Staff berhasil ditambahkan", staff });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// memperbarui data staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ msg: "Staff tidak ditemukan" });

    await staff.update(req.body);
    res.json({ msg: "Staff diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// memperbarui data staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ msg: "Staff tidak ditemukan" });

    const userId = staff.id_user;
    await staff.destroy();
    await User.destroy({ where: { id: userId } });

    res.json({ msg: "Staff dan akun user terkait berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
