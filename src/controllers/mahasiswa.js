import { Mahasiswa, User } from "../models/dbModel.js";

// mendapatkan semua data mahasiswa
export const getAllMahasiswa = async (req, res) => {
  try {
    const data = await Mahasiswa.findAll({ include: [User] });
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// mendapatkan data mahasiswa berdasarkan id
export const getMahasiswaById = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByPk(req.params.id, { include: [User] });
    if (!mahasiswa) return res.status(404).json({ msg: "Mahasiswa tidak ditemukan" });
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// menambahkan data mahasiswa
export const createMahasiswa = async (req, res) => {
  try {
    const {
      username,
      password,
      kode_mahasiswa,
      nama_mahasiswa,
      jk_mahasiswa,
      jurusan_mahasiswa,
      no_tel_mahasiswa
    } = req.body;

    const user = await User.create({ username, password, role: "mahasiswa" });
    const mahasiswa = await Mahasiswa.create({
      id_user: user.id,
      kode_mahasiswa,
      nama_mahasiswa,
      jk_mahasiswa,
      jurusan_mahasiswa,
      no_tel_mahasiswa
    });

    res.status(201).json({ msg: "Mahasiswa berhasil ditambahkan", mahasiswa });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// memperbarui data mahasiswa
export const updateMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByPk(req.params.id);
    if (!mahasiswa) return res.status(404).json({ msg: "Mahasiswa tidak ditemukan" });

    await mahasiswa.update(req.body);
    res.json({ msg: "Mahasiswa diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//
export const deleteMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByPk(req.params.id);
    if (!mahasiswa) return res.status(404).json({ msg: "Mahasiswa tidak ditemukan" });

    const userId = mahasiswa.id_user;
    await mahasiswa.destroy();
    await User.destroy({ where: { id: userId } });

    res.json({ msg: "Mahasiswa dan akun user terkait berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
