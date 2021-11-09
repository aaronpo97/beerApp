import BeerPost from '../../database/models/BeerSchema.js';

export default async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findById(id);
		res.send(post);
	} catch (error) {
		next(error);
	}
};
