import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Customer from './customer';
class Ticket extends Model { }

Ticket.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  seatNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purchasedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Canceled', 'Completed'),
    defaultValue: 'Active',
  },
}, {
  sequelize,
  modelName: 'Ticket',
  tableName: 'tickets',
  timestamps: true,
});
// Relationship with Customer
Customer.hasMany(Ticket, { foreignKey: 'customerId' });
Ticket.belongsTo(Customer, { foreignKey: 'customerId' });

export default Ticket;
