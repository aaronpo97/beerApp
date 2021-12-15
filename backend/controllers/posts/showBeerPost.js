import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';

const showBeerPost = async (req, res, next) => {
	const { id } = req.params;
	try {
		const post = await BeerPost.findById(id).populate('brewery');
		if (!post) throw new ServerError('Could not find a post with that id.', 404);

		res.json(post);
	} catch (error) {
		next(error);
	}
};

export default showBeerPost;
