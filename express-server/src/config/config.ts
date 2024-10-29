import { Dialect } from 'sequelize/types';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
// Define the database configuration interface
interface DBConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port?: number;
  };
}

// Define the configuration object
const config: DBConfig = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Root',
    database: process.env.DB_NAME || 'flarebreak',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
    port: parseInt(process.env.DB_PORT as string, 10),
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'Root',
    database: process.env.DB_DATABASE || 'flarebreak',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
    port: parseInt(process.env.DB_PORT as string, 10),
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'production_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
    port: parseInt(process.env.DB_PORT as string, 10),
  },
};

// Export the configuration
export default config;
