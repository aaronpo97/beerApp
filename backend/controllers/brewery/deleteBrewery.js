import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';

const deleteBrewery = async (req, res, next) => {
	try {
		const { id } = req.params;
		const brewery = await Brewery.findByIdAndDelete(id);

		for (let beerPost of brewery.beers) {
			await BeerPost.findByIdAndDelete(beerPost.toString());
		}

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
