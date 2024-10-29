import { Model, DataTypes, type Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the import according to your file structure
import bcrypt from 'bcrypt';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username?: string;
  email: string;
  userPassword: string;
  accessToken?: string; // Optional, can be null initially
  refreshToken?: string; // Optional, can be null initially
  resetToken?: string | null; // Optional, can be null initially
  resetTokenExpiry?: Date | null; // Optional, can be null initially
  role?: string; // Optional, can be null initially

}

// Define attributes for creating a new user
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

  public id!: number; // New primary key
  public username!: string;
  public email!: string;
  public userPassword!: string;
  public accessToken?: string;
  public refreshToken?: string;
  public resetToken: string | null | undefined; // Allow null here
  public resetTokenExpiry: Date | null | undefined; // Allow null here
  public role?: string;
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

    // Method to check if the entered current password is correct
  async checkPassword( enteredPassword: string ): Promise<boolean> {
      return await bcrypt.compare(enteredPassword, this.userPassword);
    }

    // Method to hash and update password
    async setPassword(newPassword: string): Promise<void> {
      this.userPassword = await bcrypt.hash(newPassword, 10);
      await this.save();
    }
}

// Initialize the User model
User.init( {
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
    allowNull: true, // Optional
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true, // Optional
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true  // Optional
  },
  resetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true  // Optional
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null for role users
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users', // Make sure this matches your database table name
  timestamps: true,  // Adds createdAt and updatedAt fields
});

export default User;
