import { Request, Response, NextFunction } from 'express';

import ServerError from '../../utilities/errors/ServerError';
import breweryValidationSchema from './validationSchemas/breweryValidationSchema';

const validateBrewery = (req: Request, res: Response, next: NextFunction) => {
  const { error } = breweryValidationSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    next(new ServerError(`Cannot post: ${message}`, 400));
  }

  next();
};

export default validateBrewery;
