import { NextFunction, Request, Response } from 'express';
import ServerError from '../../utilities/errors/ServerError';
import beerPostValidationSchema from './validationSchemas/beerPostValidationSchema';

const validateBeerPost = (req: Request, res: Response, next: NextFunction) => {
  const { error } = beerPostValidationSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    next(new ServerError(`Cannot post: ${message}`, 400));
  }

  next();
};

export default validateBeerPost;
