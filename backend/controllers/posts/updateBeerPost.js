import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';

export default async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findById(id);

		BeerPost.findByIdAndUpdate();

		console.log(post);
	} catch (error) {
		next(
			new ServerError(`Cannot find a post with the ID: ${req.params.id}`),
			404
		);
	}
};
