import { QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('tickets', [
      {
        customerId: 1, // Assuming this customer ID exists in the customers table
        eventName: 'Summer Music Festival',
        price: 50.00,
        seatNumber: 'A1',
        eventDate: new Date(),
        purchasedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 2, // Assuming this customer ID exists in the customers table
        eventName: 'Winter Gala',
        price: 120.00,
        seatNumber: 'B2',
        eventDate: new Date(),
        purchasedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 1, // Assuming this customer ID exists in the customers table
        eventName: 'Tech Conference 2025',
        price: 200.00,
        seatNumber: 'C3',
        eventDate: new Date(),
        purchasedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 3, // Assuming this customer ID exists in the customers table
        eventName: 'Comedy Night',
        price: 75.00,
        seatNumber: null, // No seat number for this event
        eventDate: new Date(),
        purchasedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('tickets', {}, {});
  },
};
