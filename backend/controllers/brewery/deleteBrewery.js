import ServerError from '../../utilities/ServerError.js';

const deleteBrewery = async (req, res, next) => {
	try {
		const { id } = req.params;
		const brewery = await Brewery.findByIdAndDelete(id);
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
