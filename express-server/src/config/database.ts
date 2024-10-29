import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Database name
  process.env.DB_USER as string, // Username
  process.env.DB_PASSWORD as string, // Password
  {
    host: process.env.DB_HOST, // Host
    port: parseInt(process.env.DB_PORT as string, 10), // Port
    dialect: 'mysql'
  }
);


export default sequelize;
