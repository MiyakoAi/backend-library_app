import { Peminjaman, Pengembalian, Buku } from "../models/dbModel.js";

export const getRiwayatMahasiswa = async (req, res) => {
  try {
    const id_user = req.user.id; // dari JWT
    const mahasiswa = await Mahasiswa.findOne({ where: { id_user } });

    if (!mahasiswa) {
      return res.status(404).json({ msg: "Mahasiswa tidak ditemukan" });
    }

    const pinjaman = await Peminjaman.findAll({
      where: { id_mahasiswa: mahasiswa.id_mahasiswa },
      include: [{ model: Buku, attributes: ["judul_buku"] }]
    });

    const pengembalian = await Pengembalian.findAll({
      where: { id_mahasiswa: mahasiswa.id_mahasiswa },
      include: [{ model: Buku, attributes: ["judul_buku"] }]
    });

    res.json({
      peminjaman: pinjaman,
      pengembalian: pengembalian
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
