import Brewery from '../../database/models/Brewery.js';
import { boolChecker } from '../../utilities/data/dataUtil.js';
import sort from '../../utilities/data/sorter.js';

const showAllBreweries = async (req, res, next) => {
	try {
		const allBreweries = !boolChecker(req.query.populate)
			? await Brewery.find()
			: await Brewery.find().populate('beers').populate('postedBy');

		const status = 200;

		const payload = sort(allBreweries, req.query.sort, req.query.param);
		res.json({ payload, status, message: 'Showing all breweries.', success: true });
	} catch (error) {
		next(error);
	}
};

export default showAllBreweries;
