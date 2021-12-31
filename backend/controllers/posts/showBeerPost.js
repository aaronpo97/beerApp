import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/errors/ServerError.js';
import { populateData } from '../../utilities/data/dataUtil.js';

const showBeerPost = async (req, res, next) => {
	const { id } = req.params;
	const query = req.query;
	try {
		const post = !populateData(query.populate)
			? await BeerPost.findById(id)
			: await BeerPost.findById(id)
					.populate('brewery')
					.populate('author')
					.populate('images');

		if (!post) throw new ServerError('Could not find a post with that id.', 404);

		res.json(post);
	} catch (error) {
		next(error);
	}
};

export default showBeerPost;
