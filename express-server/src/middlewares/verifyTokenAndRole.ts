import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Ensure you have this package installed
import  User  from '../models/user'; // Adjust the import based on your file structure

const secretKey = process.env.JWT_SECRET || 'your_jwt_secret'; // Use your secret from env

export const verifyTokenAndRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extract token from headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ error: 'Token is required' });
    return; // Exit the middleware after sending the response
  }

  try {
    // Verify token
    const decoded: any = jwt.verify(token, secretKey);
    const userId = decoded.id; // Assuming the payload has the user's ID

    // Check user role from the database
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(403).json({ error: 'User not found' });
      return; // Exit the middleware after sending the response
    }

    if (user.role !== 'super_admin') {
      res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      return; // Exit the middleware after sending the response
    }

    // Attach user to request object
    req.user = user;
    next(); // Call the next middleware
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return; // Exit the middleware after sending the response
  }
};
