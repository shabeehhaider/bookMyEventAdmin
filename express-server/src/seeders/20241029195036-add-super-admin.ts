import { QueryInterface, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
export = {
  up: async ( queryInterface: QueryInterface ) => {
    const hashedPassword = await bcrypt.hash('password123', 10); // Replace 'password123' with a default password

    await queryInterface.bulkInsert('users', [{
      username: 'Super Admin',
      email: 'partyyacht@admin.com',
      userPassword: await bcrypt.hash('admin@1234', 10),
      role: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'John Doe',
      email: 'john@example.com',
      userPassword: hashedPassword,
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'john@example.com',
      email: 'jane@example.com',
      userPassword: hashedPassword,
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {} );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'test@example.com' }, {});
  }
};
