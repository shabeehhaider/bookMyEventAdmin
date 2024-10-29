import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

// Initialize Sequelize with `sequelize-typescript`
const sequelize = new Sequelize({
  ...configEnv,
  models: [path.join(__dirname, '**/*.model.ts')], // Path to your model files
  logging: false, // Set to true to enable SQL logging
});

// Initialize models
const db: any = {};

// Set associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
