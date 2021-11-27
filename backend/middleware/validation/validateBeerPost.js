import Joi from 'joi';
import ServerError from '../../utilities/ServerError.js';
import beerPostValidationSchema from './validationSchemas/beerPostValidationSchema.js';

const validateBeerPost = (req, res) => {
	const { error } = beerPostValidationSchema.validate(req.body);

	if (error) {
		const message = error.details.map(el => el.message).join(',');
		throw new ServerError(message, 400);
	}
};

export default validateBeerPost;
