import BeerPost from '../../database/models/BeerSchema.js';

export default async (req, res, next) => {
	console.log(req.body);
	try {
		const post = new BeerPost(req.body);
		await post.save();
		res.send(post);
	} catch (error) {
		if (error.name === 'ValidationError') {
			next(new Error(`Mongoose validation error. ${error.message}`));
		} else {
			next();
		}
	}
};
