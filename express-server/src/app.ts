import express, {type Application} from 'express';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
//import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandler';
import './config/passport-setup';
// Load environment variables from .env file
dotenv.config();
const app: Application = express();
app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );

// Initialize session
app.use( session( {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
} ) );
app.use( passport.initialize() );
app.use( passport.session() );

//Configure CORS
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:8100'],
  methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
  allowedHeaders: [ 'Content-Type', 'Authorization' ]
}
app.use( cors( corsOptions ) );


// Middleware
app.use( bodyParser.json() );

app.use( '/api/auth', authRoutes );
app.use('/api', customerRoutes);
// Error handling middleware
app.use(errorHandler);
export default app;
