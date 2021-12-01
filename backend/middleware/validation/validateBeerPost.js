import ServerError from '../../utilities/ServerError.js';
import beerPostValidationSchema from './validationSchemas/beerPostValidationSchema.js';

const validateBeerPost = (req, res, next) => {
	const { error } = beerPostValidationSchema.validate(req.body);

	if (error) {
		const message = error.details.map(el => el.message).join(',');
		next(new ServerError(`Cannot post: ${message}`, 400));
	}

	next();
};

export default validateBeerPost;
