import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

export const project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
});

export default project;
