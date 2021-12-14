import ServerError from '../../utilities/ServerError.js';

const createBrewery = async (req, res, next) => {
	try {
		console.log(req.currentUser);
		const newBrewery = new Brewery(req.body);
		newBrewery.postedBy = req.currentUser;
		await newBrewery.save();

		res.json({ message: 'success', payload: newBrewery, status: 200 });
	} catch (error) {
		if (error.name === 'ValidationError') {
			next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
		} else {
			next(error);
		}
	}
};

export default createBrewery;
