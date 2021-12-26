import ServerError from '../../utilities/errors/ServerError.js';
import geocode from '../../utilities/mapbox/geocode.js';
import Brewery from '../../database/models/Brewery.js';

const createBrewery = async (req, res, next) => {
	try {
		const { name, description, address, images = [] } = req.body;

		if (!(name && description && address)) {
			throw new ServerError('Name, description and address must be provided.', 401);
		}

		const geoData = await geocode(address);
		const { place_name, geometry } = geoData;

		const breweryData = {
			name,
			description,
			images,
			location: { place_name, geometry },
			postedBy: req.currentUser,
		};
		const newBrewery = new Brewery(breweryData);
		await newBrewery.save();
		res.status(201).json({ message: 'success', payload: newBrewery, status: 200 });
	} catch (error) {
		if (error.name === 'ValidationError') {
			next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
		} else {
			next(error);
		}
	}
};
export default createBrewery;
