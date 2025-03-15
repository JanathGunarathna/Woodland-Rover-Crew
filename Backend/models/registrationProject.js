// registrationProject.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import account from './account.js';
import project from './project.js';

export const registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: project,
      key: 'id'
    }
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scoutLevel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'bank', 'online'),
    allowNull: false
  },
  paymentAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentReference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: {
      model: account,
      key: 'id'
    },
    allowNull: false
  }
});

// Define the relationships
registration.belongsTo(account, { foreignKey: 'accountId' });
account.hasMany(registration, { foreignKey: 'accountId' });

registration.belongsTo(project, { foreignKey: 'projectId' });
project.hasMany(registration, { foreignKey: 'projectId' });

export default registration;