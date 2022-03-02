import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ServerError from '../../utilities/errors/ServerError';
import { NextFunction, Request, Response } from 'express';
import process from 'process';
import User, { UserInterface } from '../../database/models/User';
import { Document } from 'mongoose';

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

declare global {
  namespace Express {
    interface Request {
      currentUser: UserInterface & Document<any, any, UserInterface>;
    }
  }
}

interface TokenInterface {
  audience: string;
}

const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.accessToken;
    const decoded = req.decoded ?? jwt.verify(token, ACCESS_TOKEN_SECRET);
    const currentUser = await User.findById((decoded as TokenInterface).audience);
    req.currentUser = currentUser;
    if (!req.currentUser) throw new ServerError('Unable to authenticate user.', 401);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new ServerError('Invalid signature.', 401));
    }
    if (error.name === 'jwt expired') {
      next(new ServerError('Cannot fulfill request as your JWT is expired.', 401));
    }
    next(error);
  }
};

export default verifyAccessToken;
