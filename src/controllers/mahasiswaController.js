import { Peminjaman, Pengembalian, Buku, Mahasiswa } from "../models/dbModel.js";

export const getRiwayatMahasiswa = async (req, res) => {
  try {
    const id_user = req.user.id; // dari JWT
    const mahasiswa = await Mahasiswa.findOne({ where: { id_user } });

    if (!mahasiswa) {
      return res.status(404).json({ msg: "Mahasiswa tidak ditemukan/Token salah" });
    }

    const pinjaman = await Peminjaman.findAll({
      where: { id_mahasiswa: mahasiswa.id_mahasiswa },
      include: [{ model: Buku, attributes: ["judul_buku"] }]
    });

    const pengembalian = await Pengembalian.findAll({
      where: { id_mahasiswa: mahasiswa.id_mahasiswa },
      include: [{ model: Buku, attributes: ["judul_buku"] }]
    });

    if (pinjaman.length === 0 && pengembalian.length === 0) {
      return res.status(200).json({ msg: "Anda belum meminjam buku dari perpustakaan." });
    }

    res.json({
      peminjaman: pinjaman,
      pengembalian: pengembalian
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};