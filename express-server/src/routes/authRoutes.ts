import express from 'express';
import {loginLocal} from '../controllers/userController';

const router = express.Router();

// Local login route
router.post( '/login/local', loginLocal );

export default router;
