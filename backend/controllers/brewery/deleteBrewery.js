import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';
import ServerError from '../../utilities/errors/ServerError.js';

const deleteBrewery = async (req, res, next) => {
	try {
		const { id } = req.params;
		const brewery = await Brewery.findByIdAndDelete(id);

		if (!brewery) {
			throw new ServerError('Cannot delete that brewery as it does not exist.', 404);
		}

		for (let beerPost of brewery.beers) await BeerPost.findByIdAndDelete(beerPost.toString());

		res.json({
			message: `Successfully deleted brewery: ${brewery.name}`,
			status: 200,
			payload: { brewery, deleted: true },
		});
	} catch (error) {
		next(error);
	}
};

export default deleteBrewery;
