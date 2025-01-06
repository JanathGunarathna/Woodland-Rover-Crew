import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

export const account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher', 'leader'),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roverRegistrationNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  crewOrSchool: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default account;
