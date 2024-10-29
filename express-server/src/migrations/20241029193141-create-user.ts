import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Auto-increment for primary key
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
          isEmail: true
        }
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  }
};
