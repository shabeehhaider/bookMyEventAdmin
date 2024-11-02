import app from './app';
import type {Request, Response} from 'express';

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
} );
// Use CORS with default settings
app.get( '/api', ( req: Request, res: Response ) => {
  res.send( 'Hello World' );
} );
