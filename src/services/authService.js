import { User, Mahasiswa, Staff } from '../models/dbModel.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (data) => {
  const { username, password, role, ...profile } = data;

  const existing = await User.findOne({ where: { username } });
  if (existing) throw new Error('Username sudah digunakan');

  const hashed = await hashPassword(password);
  const user = await User.create({ username, password: hashed, role });

  if (role === 'mahasiswa') {
    await Mahasiswa.create({ ...profile, id_user: user.id });
  } else if (role === 'staff') {
    await Staff.create({
      id_user: user.id,
      nama_staff: profile.nama,
      jabatan_staff: profile.jabatan,
      no_tel_staff: profile.no_tel
    });
  }

  return { id: user.id, username: user.username, role: user.role };
};

export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error("User tidak ditemukan");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Password salah");

  const token = generateToken(user);

  let profile = null;

  if (user.role === "mahasiswa") {
    const mhs = await Mahasiswa.findOne({
      where: { id_user: user.id },
      attributes: ["nama_mahasiswa", "kode_mahasiswa", "jurusan_mahasiswa"]
    });
    profile = {
      nama: mhs?.nama_mahasiswa,
      kode: mhs?.kode_mahasiswa,
      jurusan: mhs?.jurusan_mahasiswa
    };
  } else if (user.role === "staff") {
    const staff = await Staff.findOne({
      where: { id_user: user.id },
      attributes: ["nama_staff", "jabatan_staff"]
    });
    profile = {
      nama: staff?.nama_staff,
      jabatan: staff?.jabatan_staff
    };
  }

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      ...profile
    }
  };
};

