import { Request, Response, NextFunction } from 'express';
import ServerError from '../../utilities/errors/ServerError';

const isAccountConfirmed = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser.isAccountConfirmed)
    throw new ServerError('Your account is not confirmed. Please confirm your account.', 403);
  next();
};

export default isAccountConfirmed;
