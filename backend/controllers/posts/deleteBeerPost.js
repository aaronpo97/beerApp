import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/errors/ServerError.js';
import Brewery from '../../database/models/Brewery.js';

const deleteBeerPost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findById(id);
		if (!post)
			throw new ServerError(
				`Cannot delete a post with the id: ${id} as it could not be found.`,
				404
			);
		const brewery = await Brewery.findByIdAndUpdate(post.brewery.toString(), {
			$pull: { beers: id },
		});

		await BeerPost.findByIdAndDelete(id);

		res.json({ message: `Deleted a post with the id ${id}.`, success: true });
	} catch (error) {
		next(error);
	}
};

export default deleteBeerPost;
