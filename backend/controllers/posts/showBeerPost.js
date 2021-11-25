import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';

const showBeerPost = async (req, res, next) => {
	const { id } = req.params;
	try {
		const post = await BeerPost.findById(id);
		if (!post) throw new ServerError('Could not find a post with that id.', 404);
		res.json(post);
	} catch (error) {
		if ((error.type = 'CastError')) {
			next(new ServerError(`Could not find a post with the id ${id} as it is not valid. `, 400));
		}

		next(error);
	}
};

export default showBeerPost;
