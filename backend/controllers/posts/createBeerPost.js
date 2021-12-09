import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';

const createBeerPost = async (req, res, next) => {
	try {
		const post = new BeerPost(req.body);
		await post.save();

		res.status(201).json({ message: 'ok', status: 201, payload: post });
	} catch (error) {
		if (error.name === 'ValidationError') {
			next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
		} else {
			next(error);
		}
	}
};

export default createBeerPost;
