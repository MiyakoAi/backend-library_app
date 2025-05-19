import { Peminjaman, Pengembalian, Mahasiswa, Buku } from "../models/dbModel.js";
import { Op } from "sequelize";

export const getPeminjamanTerlambat = async (req, res) => {
  try {
    const today = new Date();

    // Cari semua peminjaman yang belum dikembalikan
    const peminjaman = await Peminjaman.findAll({
      where: {
        tanggal_kembali: { [Op.lt]: today }
      },
      include: [
        {
          model: Mahasiswa,
          attributes: ["nama_mahasiswa", "kode_mahasiswa", "jurusan_mahasiswa", "no_tel_mahasiswa"]
        },
        {
          model: Buku,
          attributes: ["judul_buku"]
        }
      ]
    });

    // Ambil semua id_peminjaman yang sudah dikembalikan
    const pengembalian = await Pengembalian.findAll({
      attributes: ["id_buku", "id_mahasiswa", "tanggal_pengembalian"]
    });

    const sudahKembali = pengembalian.map(p => `${p.id_buku}-${p.id_mahasiswa}`);

    // Filter hanya yang belum dikembalikan
    const dataTerlambat = peminjaman.filter(p => {
      const key = `${p.id_buku}-${p.id_mahasiswa}`;
      return !sudahKembali.includes(key);
    }).map(p => {
      const tanggalKembali = new Date(p.tanggal_kembali);
      const selisih = Math.ceil((today - tanggalKembali) / (1000 * 60 * 60 * 24));
      return {
        nama_mahasiswa: p.Mahasiswa?.nama_mahasiswa,
        kode_mahasiswa: p.Mahasiswa?.kode_mahasiswa,
        jurusan_mahasiswa: p.Mahasiswa?.jurusan_mahasiswa,
        no_tel_mahasiswa: p.Mahasiswa?.no_tel_mahasiswa,
        judul_buku: p.Buku?.judul_buku,
        tanggal_pinjam: p.tanggal_pinjam,
        tanggal_kembali: p.tanggal_kembali,
        terlambat: selisih,
        denda: selisih * 5000
      }
    });

    if (dataTerlambat.length === 0) {
      return res.status(200).json({ msg: "Tidak ada mahasiswa yang meminjam buku dari perpustakaan." });
    }

    res.json(dataTerlambat);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
