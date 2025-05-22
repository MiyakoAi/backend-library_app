import { Peminjaman, Pengembalian, Mahasiswa, Buku, Staff } from "../models/dbModel.js";

export const createPeminjaman = async (req, res) => {
  try {
    const { id_buku, id_mahasiswa } = req.body;
    const id_user = req.user.id; // Ambil ID dari token

    // Temukan staff berdasarkan ID user dari token
    const staff = await Staff.findOne({ where: { id_user } });
    if (!staff) return res.status(404).json({ msg: "Staff tidak ditemukan dari token" });

    // Validasi: cek buku
    const buku = await Buku.findByPk(id_buku);
    if (!buku) return res.status(404).json({ msg: "Buku tidak ditemukan" });
    if (buku.stok <= 0) return res.status(400).json({ msg: "Stok buku habis" });

    // Validasi: cek mahasiswa
    const mahasiswa = await Mahasiswa.findByPk(id_mahasiswa);
    if (!mahasiswa) return res.status(404).json({ msg: "Mahasiswa tidak ditemukan" });

    // Cek apakah mahasiswa sudah meminjam buku ini dan belum mengembalikannya
    const sudahPinjam = await Peminjaman.findOne({
      where: { id_buku, id_mahasiswa }
    });

    if (sudahPinjam) {
      const sudahKembali = await Pengembalian.findOne({
        where: { id_buku, id_mahasiswa }
      });
      if (!sudahKembali) {
        return res.status(400).json({
          msg: "Mahasiswa ini masih memiliki pinjaman untuk buku ini dan belum dikembalikan"
        });
      }
    }

    const tanggal_pinjam = new Date();
    const tanggal_kembali = new Date(tanggal_pinjam);
    tanggal_kembali.setDate(tanggal_pinjam.getDate() + 3);

    const peminjaman = await Peminjaman.create({
      id_buku,
      id_mahasiswa,
      id_staff: staff.id_staff,
      tanggal_pinjam,
      tanggal_kembali,
    });

    buku.stok -= 1;
    await buku.save();

    res.status(201).json({
      msg: "Buku berhasil dipinjamkan",
      data: {
        id_peminjaman: peminjaman.id_peminjaman,
        judul_buku: buku.judul_buku,
        id_buku: peminjaman.id_buku,
        id_mahasiswa: peminjaman.id_mahasiswa,
        nama_mahasiswa: mahasiswa.nama_mahasiswa,
        id_staff: staff.id_staff,
        nama_staff: staff.nama_staff,
        tanggal_pinjam: tanggal_pinjam.toISOString().split('T')[0],
        tanggal_kembali: tanggal_kembali.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ msg: error.message });
  }
};
