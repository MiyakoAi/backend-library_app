import { Pengembalian, Peminjaman, Buku, Staff } from "../models/dbModel.js";

export const createPengembalian = async (req, res) => {
  try {
    const { id_mahasiswa, id_buku } = req.body;
    const id_user = req.user.id;

    const staff = await Staff.findOne({ where: { id_user } });
    if (!staff) return res.status(404).json({ msg: "Staff tidak ditemukan dari token" });

    // Cek apakah peminjaman ada
    const peminjaman = await Peminjaman.findOne({
      where: { id_mahasiswa, id_buku },
      order: [["tanggal_pinjam", "DESC"]],
    });

    if (!peminjaman) {
      return res.status(404).json({ msg: "Data peminjaman tidak ditemukan" });
    }

    // Cek apakah sudah dikembalikan
    const pengembalianSebelumnya = await Pengembalian.findOne({
      where: { id_mahasiswa, id_buku }
    });

    if (pengembalianSebelumnya) {
      return res.status(400).json({
        msg: "Buku ini sudah dikembalikan oleh mahasiswa tersebut"
      });
    }

    // Hitung denda
    const today = new Date();
    const tanggalKembali = new Date(peminjaman.tanggal_kembali);
    const selisihHari = Math.ceil((today - tanggalKembali) / (1000 * 60 * 60 * 24));
    const denda = selisihHari > 0 ? selisihHari * 5000 : 0;

    // Tambahkan stok
    const buku = await Buku.findByPk(id_buku);
    if (buku) {
      buku.stok += 1;
      await buku.save();
    }

    const pengembalian = await Pengembalian.create({
      tanggal_pengembalian: today,
      denda,
      status_pengembalian: "Sudah Dikembalikan",
      id_buku,
      id_mahasiswa,
      id_staff: staff.id_staff
    });

    res.status(201).json({
      msg: "Pengembalian dicatat",
      data: {
        ...pengembalian.toJSON(),
        id_staff: staff.id_staff
      }
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
