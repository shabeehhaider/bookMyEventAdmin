import { Router } from 'express';
import CustomerController from '../controllers/customerController';

const router = Router();

router.post('/customers/create', CustomerController.createCustomer);
router.get('/customers/all', CustomerController.getAllCustomers);
router.get('/customers/:id', CustomerController.getCustomerById);
router.put('/customers/:id', CustomerController.updateCustomer);
router.delete('/customers/:id', CustomerController.deleteCustomer);
router.post('/customers/:customerId/tickets', CustomerController.addTicket);
router.get('/customers/:customerId/tickets', CustomerController.getCustomerTickets);

export default router;
