import { Peminjaman, Pengembalian, Mahasiswa, Buku, Staff } from "../models/dbModel.js";
import { Op } from "sequelize";

export const getPeminjamanTerlambat = async (req, res) => {
  try {
    const today = new Date();

    const peminjaman = await Peminjaman.findAll({
      where: {
        tanggal_kembali: {
          [Op.lt]: today,
          [Op.ne]: null
        }
      },
      include: [
        {
          model: Mahasiswa,
          attributes: ["nama_mahasiswa", "kode_mahasiswa", "jurusan_mahasiswa", "no_tel_mahasiswa"]
        },
        {
          model: Buku,
          attributes: ["judul_buku", "id_buku"]
        },
        {
          model: Staff,
          attributes: ["nama_staff"]
        }
      ]
    });

    const pengembalian = await Pengembalian.findAll({
      attributes: ["id_buku", "id_mahasiswa", "id_staff", "tanggal_pengembalian"],
      include: [
        {
          model: Staff,
          attributes: ["nama_staff"]
        }
      ]
    });

    const sudahKembaliSet = new Set(
      pengembalian.map(p => `${p.id_buku}-${p.id_mahasiswa}`)
    );

    const dataTerlambat = peminjaman
      .filter(p => {
        const key = `${p.id_buku}-${p.id_mahasiswa}`;
        return !sudahKembaliSet.has(key);
      })
      .map(p => {
        const tanggalKembali = new Date(p.tanggal_kembali);
        const terlambatHari = Math.max(0, Math.ceil((today - tanggalKembali) / (1000 * 60 * 60 * 24)));

        return {
          nama_mahasiswa: p.Mahasiswa?.nama_mahasiswa,
          kode_mahasiswa: p.Mahasiswa?.kode_mahasiswa,
          jurusan_mahasiswa: p.Mahasiswa?.jurusan_mahasiswa,
          no_tel_mahasiswa: p.Mahasiswa?.no_tel_mahasiswa,
          judul_buku: p.Buku?.judul_buku,
          kode_buku: p.Buku?.id_buku,
          staff_peminjam: p.Staff?.nama_staff,
          tanggal_pinjam: p.tanggal_pinjam,
          tanggal_kembali: p.tanggal_kembali,
          terlambat: terlambatHari,
          denda: terlambatHari * 5000
        };
      });

    if (dataTerlambat.length === 0) {
      return res.status(200).json({ msg: "Tidak ada mahasiswa yang terlambat mengembalikan buku." });
    }

    res.json(dataTerlambat);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    res.status(500).json({ msg: err.message });
  }
};
