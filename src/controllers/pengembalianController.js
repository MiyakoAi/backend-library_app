import { Pengembalian, Peminjaman, Buku } from "../models/dbModel.js";

export const createPengembalian = async (req, res) => {
  try {
    const { id_mahasiswa, id_buku, id_staff } = req.body;

    // Cek data peminjaman aktif
    const peminjaman = await Peminjaman.findOne({
      where: { id_mahasiswa, id_buku },
      order: [["tanggal_pinjam", "DESC"]],
    });

    if (!peminjaman) {
      return res.status(404).json({ msg: "Data peminjaman tidak ditemukan" });
    }

    const today = new Date();
    const tanggalKembali = new Date(peminjaman.tanggal_kembali);
    const selisihHari = Math.ceil((today - tanggalKembali) / (1000 * 60 * 60 * 24));
    const denda = selisihHari > 0 ? selisihHari * 5000 : 0;

    // Tambah stok buku
    const buku = await Buku.findByPk(id_buku);
    if (buku) {
      buku.stok += 1;
      await buku.save();
    }

    // Simpan ke pengembalian
    const pengembalian = await Pengembalian.create({
      tanggal_pengembalian: today,
      denda,
      status_pengembalian: "Sudah Dikembalikan",
      id_buku,
      id_mahasiswa,
      id_staff
    });

    res.status(201).json({
      msg: "Pengembalian dicatat",
      data: pengembalian
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
