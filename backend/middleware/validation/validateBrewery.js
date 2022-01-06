import ServerError from '../../utilities/errors/ServerError.js';
import breweryValidationSchema from './validationSchemas/breweryValidationSchema.js';

const validateBrewery = (req, res, next) => {
	const { error } = breweryValidationSchema.validate(req.body);
	if (error) {
		const message = error.details.map(el => el.message).join(',');
		next(new ServerError(`Cannot post: ${message}`, 400));
	}

	next();
};

export default validateBrewery;
