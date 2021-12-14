import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';

const deleteBrewery = async (req, res, next) => {
	try {
		const { id } = req.params;
		const brewery = await Brewery.findByIdAndDelete(id);

		// console.log(brewery.beers[0]);

		res.json({
			message: 'success',
			status: 200,
			payload: { brewery, deleted: true },
		});
	} catch (error) {
		next(error);
	}
};

export default deleteBrewery;
