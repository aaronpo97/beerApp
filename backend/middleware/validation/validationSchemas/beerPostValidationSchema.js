import Joi from 'joi';

const beerPostValidationSchema = Joi.object({
	name: Joi.string().required(),
	type: Joi.string().required(),
	description: Joi.string().required(),
	brewery: Joi.string().required(),
	location: Joi.string().required(),
	image: Joi.string().required(),
	abv: Joi.number().required().min(0),
	ibu: Joi.number().required().min(0),
});

export default beerPostValidationSchema;
