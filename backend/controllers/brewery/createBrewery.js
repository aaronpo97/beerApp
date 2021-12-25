import ServerError from '../../utilities/errors/ServerError.js';
import Brewery from '../../database/models/Brewery.js';
import geocode from '../../utilities/geocode/geocode.js';

const createBrewery = async (req, res, next) => {
	try {
		const { name, address, description, images = [] } = req.body;

		const geoData = await geocode(name);
		const { place_name, geometry } = geoData;

		const breweryData = {
			name,
			description,
			images,
			location: { place_name, geometry },
			postedBy: req.currentUser,
		};

		const brewery = new Brewery(breweryData);
		res.json({ message: 'created a new brewery', status: 201, payload: brewery });
	} catch (error) {
		if (error.name === 'ValidationError') {
			next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
		} else {
			next(error);
		}
	}
};

export default createBrewery;
