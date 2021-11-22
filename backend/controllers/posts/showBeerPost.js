import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';

export default async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findById(id);
		res.send(post);
	} catch (error) {
		next(new ServerError(`Cannot find a post with the ID: ${req.params.id}`, 404));
	}
};
