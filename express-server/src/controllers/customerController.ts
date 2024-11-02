import {Request, Response, NextFunction} from 'express';
import Customer from '../models/customer';
import Ticket from '../models/ticket';
import User from '../models/user';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';
class CustomerController {
  // Create a new customer
  async createCustomer( req: Request, res: Response, next: NextFunction ): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      const {
        name,
        email,
        gender,
        dateOfBirth,
        phoneNumber,
        status,
        passportNumber,
        emiratesID,
        userPassword,
      } = req.body;

      // Validate input
      if ( !name || !email || !gender || !dateOfBirth || !phoneNumber || !status || !userPassword ) {
        res.status( 400 ).json( {message: "All fields are required"} );
        return;
      }
      // Check if user already exists
      const existingUser = await User.findOne( {where: {email}} );
      if ( existingUser ) {
        res.status( 400 ).json( {message: "User already exists"} );
        return;
      }
      // Validate required fields based on status
      if ( status === 'Resident' && !emiratesID ) {
        res.status( 400 ).json( {error: "Emirates ID is required for residents."} );
        return;
      }
      if ( status === 'Tourist' && !passportNumber ) {
        res.status( 400 ).json( {error: "Passport number is required for tourists."} );
        return;
      }

      // Prepare data for Customer creation
      const customerData: any = {
        name,
        email,
        gender,
        dateOfBirth,
        phoneNumber,
        status
      };

      if ( status === 'Resident' ) {
        customerData.emiratesID = emiratesID;
      } else if ( status === 'Tourist' ) {
        customerData.passportNumber = passportNumber;
      }

      // Create the customer in the Customer table
      const newCustomer = await Customer.create( customerData, {transaction} );

      // Hash the user's password before saving
      const hashedPassword = await bcrypt.hash( userPassword, 10 );

      const createdBy = 1;
      // Create a corresponding user account in the User table
      const newUser = await User.create( {
        username: name, // or any other logic to generate a username
        email,
        userPassword: hashedPassword,
        role: User.ROLE_CUSTOMER_SERVICE, // Default role for customer
        createdBy, // Reference to the admin who created this customer
      }, {transaction} );

      // Commit transaction if both Customer and User entries were created successfully
      await transaction.commit();

      res.status( 201 ).json( {
        customer: newCustomer,
        user: newUser
      } );
    } catch ( error ) {
      await transaction.rollback();
      next( error );
    }
  }


  // Get all customers
  async getAllCustomers( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
      const customers = await Customer.findAll( {include: Ticket} );
      res.status( 200 ).json( customers );
    } catch ( error ) {
      next( error );
    }
  }

  // Get a single customer by ID
  async getCustomerById( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
      const {id} = req.params;
      const customer = await Customer.findByPk( id, {include: Ticket} );

      if ( !customer ) {
        res.status( 404 ).json( {error: 'Customer not found'} );
        return;
      }

      res.status( 200 ).json( customer );
    } catch ( error ) {
      next( error );
    }
  }

  // Update a customer
  async updateCustomer( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
      const {id} = req.params;
      const updates = req.body;

      const customer = await Customer.findByPk( id );

      if ( !customer ) {
        res.status( 404 ).json( {error: 'Customer not found'} );
        return;
      }

      await customer.update( updates );
      res.status( 200 ).json( customer );
    } catch ( error ) {
      next( error );
    }
  }

  // Delete a customer
  async deleteCustomer( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
      const {id} = req.params;
      const customer = await Customer.findByPk( id );

      if ( !customer ) {
        res.status( 404 ).json( {error: 'Customer not found'} );
        return;
      }

      await customer.destroy();
      res.status( 204 ).json();
    } catch ( error ) {
      next( error );
    }
  }

  // Add a ticket for a customer
  async addTicket( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
      const {customerId} = req.params;
      const {eventDate, eventName, price, seatNumber} = req.body;

      const customer: any = await Customer.findByPk( customerId );
      if ( !customer ) {
        res.status( 404 ).json( {error: 'Customer not found'} );
        return;
      }

      const ticket = await Ticket.create( {
        customerId: customer.id,
        eventDate,
        eventName,
        price,
        seatNumber,
      } );

      res.status( 201 ).json( ticket );
    } catch ( error ) {
      next( error );
    }
  }

  // Get tickets for a customer
  async getCustomerTickets( req: Request, res: Response, next: NextFunction ): Promise<void> {
    try {
      const {customerId} = req.params;

      const tickets = await Ticket.findAll( {
        where: {customerId},
      } );

      res.status( 200 ).json( tickets );
    } catch ( error ) {
      next( error );
    }
  }
}

export default new CustomerController();
