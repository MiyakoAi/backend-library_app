import Buku from '../models/dbModel.js'; 

// Create buku baru
export const createBuku = async (req, res) => {
  try {
    const { judul_buku, penulis_buku, penerbit_buku, tahun_penerbit, stok, images } = req.body;
    const newBuku = await Buku.Buku.create({
      judul_buku,
      penulis_buku,
      penerbit_buku,
      tahun_penerbit,
      stok,
      images
    });
    res.status(201).json(newBuku);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read semua buku
export const getAllBuku = async (req, res) => {
  try {
    const bukus = await Buku.Buku.findAll();
    res.json(bukus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read buku by id
export const getBukuById = async (req, res) => {
  try {
    const id = req.params.id;
    const buku = await Buku.Buku.findByPk(id);
    if (!buku) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(buku);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update buku by id
export const updateBuku = async (req, res) => {
  try {
    const id = req.params.id;
    const { judul_buku, penulis_buku, penerbit_buku, tahun_penerbit, stok, images } = req.body;

    const buku = await Buku.Buku.findByPk(id);
    if (!buku) return res.status(404).json({ message: 'Buku tidak ditemukan' });

    await buku.update({ judul_buku, penulis_buku, penerbit_buku, tahun_penerbit, stok, images });
    res.json(buku);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete buku by id
export const deleteBuku = async (req, res) => {
  try {
    const id = req.params.id;
    const buku = await Buku.Buku.findByPk(id);
    if (!buku) return res.status(404).json({ message: 'Buku tidak ditemukan' });

    await buku.destroy();
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
