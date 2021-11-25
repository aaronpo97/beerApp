import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';

const deleteBeerPost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findByIdAndDelete(id);
		if (!post) throw new ServerError('Could not find a post with that id.', 404);
		res.json({ message: `Deleted a post with the id ${id}.`, success: true });
	} catch (error) {
		next(error);
	}
};

export default deleteBeerPost;
