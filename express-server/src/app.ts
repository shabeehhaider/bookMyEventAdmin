import express, {type Application} from 'express';
//import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
const app: Application = express();
app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );

//app.use('/api/users', userRoutes);

export default app;
