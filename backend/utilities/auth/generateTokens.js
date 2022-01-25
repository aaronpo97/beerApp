import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../../database/models/User.js';
import ServerError from '../errors/ServerError.js';

dotenv.config();

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, CONFIRMATION_TOKEN_SECRET } = process.env;
export const generateAccessToken = async req => {
   const refreshToken = req.headers['x-auth-token'] || req.refreshToken;
   try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

      const user = await User.findById(decoded.audience);
      if (!user) throw new ServerError('Invalid JWT.', 401);
      return jwt.sign(
         { audience: user._id, issuer: 'http://localhost:5000' },
         ACCESS_TOKEN_SECRET,
         { expiresIn: '10m' },
         { algorithm: 'HS256' }
      );
   } catch (error) {
      return Promise.reject(error);
   }
};

export const generateRefreshToken = async user => {
   return jwt.sign(
      { audience: user._id, issuer: 'http://localhost:5000' },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '43200m' },
      { algorithm: 'HS256' }
   );
};

export const generateConfirmationToken = async user => {
   return jwt.sign(
      { userToConfirm: user.username, id: user._id },
      CONFIRMATION_TOKEN_SECRET,
      { expiresIn: '10m' },
      { algorithm: 'HS256' }
   );
};
