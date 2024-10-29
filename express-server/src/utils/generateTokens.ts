import jwt from 'jsonwebtoken';
// Generate JWT tokens
export const generateTokens = ( user: any ) => {
  const accessToken = jwt.sign( {id: user.id, email: user.email, userName: user.username, role: user.role}, process.env.JWT_SECRET!, {expiresIn: '60m'} );
  const refreshToken = jwt.sign( {id: user.id, email: user.email, userName: user.username, role: user.role}, process.env.JWT_REFRESH_SECRET!, {expiresIn: '60d'} );
  return {accessToken, refreshToken};
};
