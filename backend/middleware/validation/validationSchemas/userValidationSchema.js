import Joi from 'joi';

//email - must be a valid email account
//password - must have one uppercase character, one number, and one special character, must be greater than 10 characters
//username - must be greater than 5 characters, must not be inappropriate and must be less than 20 characters

// const stuff = /[0-9]/;

const userValidationSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(32).required(),
});

export default userValidationSchema;

console.log(userValidationSchema.validate({ email: 'xojid44173@luxiu2.com', password: 'fdf@Adss2aa' }));
