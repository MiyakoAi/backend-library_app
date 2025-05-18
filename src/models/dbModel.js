import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Model Buku
export const Buku = sequelize.define('Buku', {
  id_buku: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  judul_buku: {type: DataTypes.STRING(255), allowNull: false},
  penulis_buku: {type: DataTypes.STRING(255), allowNull: false},
  penerbit_buku: {type: DataTypes.STRING(255), allowNull: false},
  tahun_penerbit: {type: DataTypes.INTEGER, allowNull: false},
  stok: {type: DataTypes.INTEGER, allowNull: false},
  images: {type: DataTypes.STRING(255), allowNull: false}
}, {tableName: 'buku', timestamps: false});

// Model Mahasiswa
export const Mahasiswa = sequelize.define('Mahasiswa', {
  id_mahasiswa: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  kode_mahasiswa: {type: DataTypes.STRING(255), allowNull: false},
  nama_mahasiswa: {type: DataTypes.STRING(100), allowNull: false},
  jk_mahasiswa: {type: DataTypes.CHAR(1), allowNull: false},
  jurusan_mahasiswa: {type: DataTypes.STRING(2), allowNull: false},
  no_tel_mahasiswa: {type: DataTypes.STRING(13), allowNull: false},
  id_user: {type: DataTypes.INTEGER, allowNull: false, unique: true}
}, {tableName: 'mahasiswa', timestamps: false});

// Model Staff
export const Staff = sequelize.define('Staff', {
  id_staff: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  nama_staff: {type: DataTypes.STRING(50), allowNull: false},
  jabatan_staff: {type: DataTypes.STRING(50), allowNull: false},
  no_tel_staff: {type: DataTypes.STRING(13), allowNull: false},
  id_user: {type: DataTypes.INTEGER, allowNull: false, unique: true}
}, {tableName: 'staff', timestamps: false});

// Model User
export const User = sequelize.define("User", {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  username: {type: DataTypes.STRING, allowNull: false, unique: true},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.ENUM('admin', 'staff', 'mahasiswa'), allowNull: false, defaultValue: 'mahasiswa'}
}, {tableName: 'users', timestamps: false});

// Model Peminjaman
export const Peminjaman = sequelize.define('Peminjaman', {
  id_peminjaman: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  tanggal_pinjam: {type: DataTypes.DATEONLY, allowNull: false},
  tanggal_kembali: {type: DataTypes.DATEONLY,allowNull: false}
}, {tableName: 'peminjaman', timestamps: false});

// Model Pengembalian
export const Pengembalian = sequelize.define('Pengembalian', {
  id_pengembalian: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
  tanggal_pengembalian: {type: DataTypes.DATEONLY, allowNull: false},
  denda: {type: DataTypes.INTEGER, allowNull: false},
  status_pengembalian: {type: DataTypes.ENUM('Belum Dikembalikan', 'Sudah Dikembalikan'), allowNull: false}
}, {tableName: 'pengembalian', timestamps: false});

// Relasi (Associations)
Buku.hasMany(Peminjaman, { foreignKey: 'id_buku' });
Peminjaman.belongsTo(Buku, { foreignKey: 'id_buku' });

Mahasiswa.hasMany(Peminjaman, { foreignKey: 'id_mahasiswa' });
Peminjaman.belongsTo(Mahasiswa, { foreignKey: 'id_mahasiswa' });

Staff.hasMany(Peminjaman, { foreignKey: 'id_staff' });
Peminjaman.belongsTo(Staff, { foreignKey: 'id_staff' });

Buku.hasMany(Pengembalian, { foreignKey: 'id_buku' });
Pengembalian.belongsTo(Buku, { foreignKey: 'id_buku' });

Mahasiswa.hasMany(Pengembalian, { foreignKey: 'id_mahasiswa' });
Pengembalian.belongsTo(Mahasiswa, { foreignKey: 'id_mahasiswa' });

Staff.hasMany(Pengembalian, { foreignKey: 'id_staff' });
Pengembalian.belongsTo(Staff, { foreignKey: 'id_staff' });

// Relasi User - Mahasiswa
User.hasOne(Mahasiswa, { foreignKey: 'id_user' });
Mahasiswa.belongsTo(User, { foreignKey: 'id_user' });

// Relasi User - Staff
User.hasOne(Staff, { foreignKey: 'id_user' });
Staff.belongsTo(User, { foreignKey: 'id_user' });

export default {sequelize, Buku, Mahasiswa, Staff, Peminjaman, Pengembalian, User};
