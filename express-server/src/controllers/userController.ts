import {Request, Response, NextFunction} from 'express';
import User from '../models/user';
import passport from 'passport';
import {generateTokens} from '../utils/generateTokens';

interface JwtPayload {
  email: string;
  id: number;
}

// Local login
export const loginLocal = ( req: Request, res: Response, next: NextFunction ) => {
  passport.authenticate( 'local', ( err: any, user: any, info: any ) => {
    if ( err ) {
      return next( err ); // Pass errors to the Express error handler
    }
    if ( !user ) {
      // Return the specific error message from Passport
      if ( info.message == 'Incorrect email.' ) {
        return res.status( 401 ).json( {emailError: 'Email wasn’t found'} );
      }
      if ( info.message == 'Incorrect password.' ) {
        return res.status( 401 ).json( {passwordError: 'Password does not match'} );
      }
    }

    // Log in the user and set up the session
    req.logIn( user, async ( err ) => {
      if ( err ) {
        return next( err ); // Pass errors to the Express error handler
      }
      // Generate JWT tokens
      const token = generateTokens( user );

      // Update the user with the tokens
      await User.update( token, {where: {email: user.email}} );
      // Successful login
      res.json( {
        message: 'Login successful',
        token,
        user: {
          email: user.email,
          username: user.username,
          role: user.role
        }
      } );
    } );
  } )( req, res, next );
};
