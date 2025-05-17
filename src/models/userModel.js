import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

export const User = sequelize.define("User", {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  username: {type: DataTypes.STRING, allowNull: false, unique: true},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.ENUM('admin', 'staff', 'mahasiswa'), allowNull: false, defaultValue: 'mahasiswa'}
}, {tableName: 'users', timestamps: false});

export default User;
