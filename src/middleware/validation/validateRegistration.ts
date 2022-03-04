import ServerError from '../../utilities/errors/ServerError';
import userValidationSchema from './validationSchemas/userValidationSchema';

import { Request, Response, NextFunction } from 'express';

const validateUserRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    next(new ServerError(`Cannot post: ${message}`, 400));
  }

  next();
};

export default validateUserRegistration;
