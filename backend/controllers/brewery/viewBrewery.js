import ServerError from '../../utilities/ServerError.js';
import Brewery from '../../database/models/Brewery.js';

const viewBrewery = async (req, res, next) => {
	try {
		const { id } = req.params;
		const brewery = await Brewery.findById(id);
		res.json({
			message: `success`,
			status: 200,
			payload: brewery,
		});
	} catch (error) {
		const { id } = req.params;
		if (error.name === 'CastError') {
			next(new ServerError(`Cannot find a brewery with an id of ${id}.`), 404);
			return;
		}
		next(error);
	}
};

export default viewBrewery;
