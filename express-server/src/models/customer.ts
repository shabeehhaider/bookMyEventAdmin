import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Customer extends Model {}

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
  status: {
    type: DataTypes.ENUM('Resident', 'Tourist'),
    allowNull: false,
  },
  passportNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
    },
  },
  emiratesID: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
    },
  },
}, {
  sequelize,
  modelName: 'Customer',
  tableName: 'customers',
  timestamps: true,
});

export default Customer;
