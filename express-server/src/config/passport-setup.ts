import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user'; // Adjust the import according to your file structure
import bcrypt from 'bcrypt';

// Local Strategy
passport.use( new LocalStrategy( {
  usernameField: 'email',
}, async ( email: string, password: string, done: any ) => {
  try {
    const user = await User.findOne( {where: {email}} );

    if ( !user ) return done( null, false, {message: 'Incorrect email.'} );

    const isMatch = await user.checkPassword( password );

    if ( !isMatch ) return done( null, false, {message: 'Incorrect password.'} );

    done( null, user );
  } catch ( error ) {
    done( error, false );
  }
} ) );

// Serialize user email into the session
passport.serializeUser( ( user: any, done:any ) => {
  done( null, user.email ); // Serialize using email
} );

// Deserialize user from session
passport.deserializeUser( async ( email: string, done:any ) => {
  try {
    const user = await User.findOne( {where: {email}} );
    if ( !user ) return done( new Error( 'User not found' ), null );
    done( null, user );
  } catch ( error ) {
    done( error, null );
  }
} );
