import { Peminjaman, Pengembalian, Mahasiswa, Buku, Staff } from "../models/dbModel.js";

// GET semua peminjaman
export const getAllPeminjaman = async (req, res) => {
  try {
    const data = await Peminjaman.findAll({
      include: [Mahasiswa, Buku, Staff]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET peminjaman berdasarkan id
export const getPeminjamanById = async (req, res) => {
  try {
    const data = await Peminjaman.findByPk(req.params.id, {
      include: [Mahasiswa, Buku, Staff]
    });
    if (!data) return res.status(404).json({ msg: "Data peminjaman tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET semua pengembalian
export const getAllPengembalian = async (req, res) => {
  try {
    const data = await Pengembalian.findAll({
      include: [Mahasiswa, Buku, Staff]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET pengembalian berdasarkan id
export const getPengembalianById = async (req, res) => {
  try {
    const data = await Pengembalian.findByPk(req.params.id, {
      include: [Mahasiswa, Buku, Staff]
    });
    if (!data) return res.status(404).json({ msg: "Data pengembalian tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
