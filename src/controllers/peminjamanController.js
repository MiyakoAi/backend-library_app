import { Peminjaman, Mahasiswa, Buku } from "../models/dbModel.js";

export const createPeminjaman = async (req, res) => {
  try {
    const { id_buku, id_mahasiswa, id_staff } = req.body;

    // Validasi: cek buku
    const buku = await Buku.findByPk(id_buku);
    if (!buku) return res.status(404).json({ msg: "Buku tidak ditemukan" });
    if (buku.stok <= 0) return res.status(400).json({ msg: "Stok buku habis" });

    // Validasi: cek mahasiswa
    const mahasiswa = await Mahasiswa.findByPk(id_mahasiswa);
    if (!mahasiswa) return res.status(404).json({ msg: "Mahasiswa tidak ditemukan" });

    // Hitung tanggal kembali = tanggal pinjam + 3 hari
    const tanggal_pinjam = new Date();
    const tanggal_kembali = new Date(tanggal_pinjam);
    tanggal_kembali.setDate(tanggal_pinjam.getDate() + 3);

    // Simpan data peminjaman
    const peminjaman = await Peminjaman.create({
      id_buku,
      id_mahasiswa,
      id_staff,
      tanggal_pinjam,
      tanggal_kembali,
    });

    // Kurangi stok buku
    buku.stok -= 1;
    await buku.save();

    res.status(201).json({ msg: "Buku berhasil dipinjamkan", data: peminjaman });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
