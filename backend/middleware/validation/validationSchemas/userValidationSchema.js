import Joi from 'joi';

//email - must be a valid email account
//password - must have one uppercase character, one number, and one special character, must be greater than 10 characters
//username - must be greater than 5 characters, must not be inappropriate and must be less than 20 characters

// const stuff = /[0-9]/;
const calculateMinAge = () => Date.now() - 599_594_400_000;

const userValidationSchema = Joi.object({
	email: Joi.string().email().required(),
	username: Joi.string().required(),
	dateOfBirth: Joi.date().max(calculateMinAge()).required(),
	password: Joi.string().min(8).max(32).required(),
	profile: Joi.object(),
	firstName: Joi.string(),
	lastName: Joi.string(),
});

export default userValidationSchema;
