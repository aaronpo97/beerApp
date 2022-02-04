import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import process from 'process';

import User from '../../database/models/User.js';
import ServerError from '../errors/ServerError.js';

dotenv.config();

const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  CONFIRMATION_TOKEN_SECRET,
  PASSWORD_RESET_SECRET,
} = process.env;

export const generateAccessToken = async (req) => {
  const refreshToken = req.headers['x-auth-token'] || req.refreshToken;
  const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded.audience);
  if (!user) throw new ServerError('Invalid JWT.', 401);
  return jwt.sign(
    { audience: user._id },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' },
    { algorithm: 'HS256' },
  );
};

export const generateRefreshToken = async (user) =>
  jwt.sign(
    { audience: user._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '43200m' },
    { algorithm: 'HS256' },
  );

export const generateConfirmationToken = async (user) =>
  jwt.sign(
    { userToConfirm: user.username, id: user._id },
    CONFIRMATION_TOKEN_SECRET,
    { expiresIn: '10m' },
    { algorithm: 'HS256' },
  );

export const generatePasswordResetToken = async (user) =>
  jwt.sign(
    { requestedUser: user.username, id: user._id },
    PASSWORD_RESET_SECRET,
    { expiresIn: '5m' },
    { algorithm: 'HS256' },
  );
