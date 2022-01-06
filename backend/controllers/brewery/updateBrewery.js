import Brewery from '../../database/models/Brewery.js';
import ServerError from '../../utilities/errors/ServerError.js';

const updateBrewery = async (req, res, next) => {
	try {
		const { id } = req.params;
		const brewery = await Brewery.findById(id);

		if (!brewery)
			throw new ServerError(`Cannot update the brewery with the id of ${id} as it could not be found.`, 404);

		await brewery.update(req.body);
		await brewery.save();
		const updatedBrewery = await Brewery.findById(id);

		res.json({ message: 'Updating a brewery!', payload: { updatedBrewery } });
	} catch (error) {
		next(error);
	}
};

export default updateBrewery;
