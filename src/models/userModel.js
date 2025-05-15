import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,},
  username: {type: DataTypes.STRING(50), allowNull: false, unique: true,},
  password: {type: DataTypes.STRING(255), allowNull: false,},
  role: {type: DataTypes.ENUM('admin', 'staff', 'mahasiswa'), allowNull: false,},
}, {tableName: 'users',timestamps: false, // jika tidak pakai createdAt/updatedAt
});

export default User;
