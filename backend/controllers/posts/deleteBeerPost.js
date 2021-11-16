import BeerPost from '../../database/models/BeerPost.js';

export default async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findByIdAndDelete(id);
		if (!post) throw new Error('Could not find a post with that id. ');
		res.send(`Deleted ${post.name}. ID: ${post._id} `);
	} catch (error) {
		next(error);
	}
};
