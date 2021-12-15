import Brewery from '../../database/models/Brewery.js';

const showAllBreweries = async (req, res, next) => {
	try {
		const allBreweries = await Brewery.find();

		res.json({
			message: 'success',
			payload: allBreweries,
			status: 200,
		});
	} catch (error) {
		next(error);
	}
};

export default showAllBreweries;
