import ServerError from '../../utilities/errors/ServerError.js';
import userValidationSchema from './validationSchemas/userValidationSchema.js';

const validateUserRegistration = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    next(new ServerError(`Cannot post: ${message}`, 400));
  }

  next();
};

export default validateUserRegistration;
