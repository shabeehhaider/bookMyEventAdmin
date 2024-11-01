import { QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('customers', [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        dateOfBirth: '1990-01-01',
        phoneNumber: '1234567890',
        status: 'Resident',
        emiratesID: '784-1987-1234567-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        gender: 'Female',
        dateOfBirth: '1985-05-15',
        phoneNumber: '0987654321',
        status: 'Tourist',
        passportNumber: 'A1234567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ali Rashid',
        email: 'alirashid@example.com',
        gender: 'Male',
        dateOfBirth: '1992-08-20',
        phoneNumber: '1122334455',
        status: 'Resident',
        emiratesID: '784-1990-2345678-9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('customers', {
      email: ['johndoe@example.com', 'janesmith@example.com', 'alirashid@example.com'],
    });
  },
};
