import { Router } from 'express';
import CustomerController from '../controllers/customerController';
import { verifyTokenAndRole } from '../middlewares/verifyTokenAndRole';

const router = Router();

router.post('/customers/create', CustomerController.createCustomer);
router.get('/customers/all',verifyTokenAndRole, CustomerController.getAllCustomers);
router.get('/customers/:id',verifyTokenAndRole, CustomerController.getCustomerById);
router.put('/customers/:id', CustomerController.updateCustomer);
router.delete('/customers/:id', CustomerController.deleteCustomer);
router.post('/customers/:customerId/tickets', CustomerController.addTicket);
router.get('/customers/:customerId/tickets',verifyTokenAndRole, CustomerController.getCustomerTickets);
router.get('/customers-with-tickets', CustomerController.getAllCustomersWithTickets);

export default router;
