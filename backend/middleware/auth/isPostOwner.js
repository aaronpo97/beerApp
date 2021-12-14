import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';
import User from '../../database/models/User.js';

const isPostOwner = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findById(id);
		if (!post) throw new ServerError('Cannot find a post with that id', 404);
		const author = await User.findById(post.author.toString());

		if (author !== req.currentUser) {
			throw new ServerError('You are not authorized to do that.', 403);
		}
		next();
	} catch (error) {
		next(error);
	}
};

export default isPostOwner;
