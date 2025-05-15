import { Mahasiswa } from '../models/dbModel.js';

// Create mahasiswa baru
export const createMahasiswa = async (req, res) => {
  try {
    const { kode_mahasiswa, nama_mahasiswa, jk_mahasiswa, jurusan_mahasiswa, no_tel_mahasiswa } = req.body;
    const newMahasiswa = await Mahasiswa.create({
      kode_mahasiswa,
      nama_mahasiswa,
      jk_mahasiswa,
      jurusan_mahasiswa,
      no_tel_mahasiswa
    });
    res.status(201).json(newMahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read semua mahasiswa
export const getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswas = await Mahasiswa.findAll();
    res.json(mahasiswas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read mahasiswa by id
export const getMahasiswaById = async (req, res) => {
  try {
    const id = req.params.id;
    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update mahasiswa by id
export const updateMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const { kode_mahasiswa, nama_mahasiswa, jk_mahasiswa, jurusan_mahasiswa, no_tel_mahasiswa } = req.body;

    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });

    await mahasiswa.update({ kode_mahasiswa, nama_mahasiswa, jk_mahasiswa, jurusan_mahasiswa, no_tel_mahasiswa });
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete mahasiswa by id
export const deleteMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });

    await mahasiswa.destroy();
    res.json({ message: 'Mahasiswa berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
