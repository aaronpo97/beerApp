import Joi from 'joi';

const beerPostValidationSchema = Joi.object({
	name: Joi.string().trim(true).required(),
	type: Joi.string().required(),
	description: Joi.string().max(400).required(),
	brewery: Joi.string().required(),
	images: Joi.array(),
	abv: Joi.number().min(0),
	ibu: Joi.number().min(0),
});

export default beerPostValidationSchema;
