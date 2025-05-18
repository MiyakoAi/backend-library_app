import { Staff, Mahasiswa } from '../models/dbModel.js'; 

export const register = async (req, res) => {
  const { username, password, role, nama, jabatan, no_tel } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role
    });

    if (role === 'staff') {
      await Staff.create({
        nama_staff: nama,
        jabatan_staff: jabatan,
        no_tel_staff: no_tel,
        id_user: newUser.id
      });
    } else if (role === 'mahasiswa') {
      await Mahasiswa.create({
        nama_mahasiswa: nama,
        kode_mahasiswa: generateKodeMahasiswa(),
        jk_mahasiswa: 'L', 
        jurusan_mahasiswa: 'TI',
        no_tel_mahasiswa: no_tel,
        id_user: newUser.id
      });
    }

    res.status(201).json({
      message: 'User berhasil terdaftar',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mendaftar', error: err.message });
  }
};
