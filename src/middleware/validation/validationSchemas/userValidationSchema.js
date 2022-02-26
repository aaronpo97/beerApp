import Joi from 'joi';
import ms from 'ms';

// email - must be a valid email account
// password - must have one uppercase character, one number, and one special character, must be greater than 10 characters

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required().min(5).max(20),
  dateOfBirth: Joi.date()
    .max(Date.now() - ms('19 years')) // because of JS date formatting, max refers to the max dateOfBirth in which someone can join the app
    .required(),
  password: Joi.string().min(8).max(32).required(),
  profile: Joi.object(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});

export default userValidationSchema;
