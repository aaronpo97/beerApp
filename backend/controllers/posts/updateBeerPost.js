import ServerError from '../../utilities/errors/ServerError.js';

const updateBeerPost = async (req, res, next) => {
	try {
		const { post } = req;
		const updatedBeer = req.body;
		await post.update(updatedBeer);
		await post.save();
		res.status(204).send();
	} catch (error) {
		if (error.name === 'CastError') {
			next(new ServerError('Your update was rejected. ' + error.message, 409));
		}
		next(error);
	}
};

export default updateBeerPost;
