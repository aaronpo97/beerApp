import Joi from 'joi';

const breweryValidationSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required().max(400).min(20),
	address: Joi.string().required(), //converted to location object
	images: Joi.array(),
	headerImage: Joi.string(),
});

export default breweryValidationSchema;
