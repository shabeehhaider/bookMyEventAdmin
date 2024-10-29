import { QueryInterface, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [{
      username: 'Super Admin',
      email: 'partyyacht@admin.com',
      userPassword: await bcrypt.hash('admin@1234', 10),
      role: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'test@example.com' }, {});
  }
};
