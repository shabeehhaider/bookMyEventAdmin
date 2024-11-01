import { Request, Response, NextFunction } from 'express';
import Customer from '../models/customer';
import Ticket from '../models/ticket';

class CustomerController {
  // Create a new customer
  async createCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, gender, dateOfBirth, phoneNumber, status, passportNumber, emiratesID } = req.body;

      const newCustomer = await Customer.create({
        name, email, gender, dateOfBirth, phoneNumber, status, passportNumber, emiratesID,
      });

      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }

  // Get all customers
  async getAllCustomers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const customers = await Customer.findAll({ include: Ticket });
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  }

  // Get a single customer by ID
  async getCustomerById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id, { include: Ticket });

      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }

      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  // Update a customer
  async updateCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const customer = await Customer.findByPk(id);

      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }

      await customer.update(updates);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  // Delete a customer
  async deleteCustomer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);

      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }

      await customer.destroy();
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  // Add a ticket for a customer
  async addTicket(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { customerId } = req.params;
      const { eventDate, eventName, price, seatNumber } = req.body;

      const customer: any = await Customer.findByPk(customerId);
      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }

      const ticket = await Ticket.create({
        customerId: customer.id,
        eventDate,
        eventName,
        price,
        seatNumber,
      });

      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  // Get tickets for a customer
  async getCustomerTickets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { customerId } = req.params;

      const tickets = await Ticket.findAll({
        where: { customerId },
      });

      res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();
