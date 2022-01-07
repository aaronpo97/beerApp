import ServerError from '../../utilities/errors/ServerError.js';
import BeerPost from '../../database/models/BeerPost.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const updateBeerPost = async (req, res, next) => {
	try {
		const { post } = req;
		const beerUpdates = req.body;
		await post.update(beerUpdates);
		await post.save();

		const updatedBeer = await BeerPost.findById(post._id);

		const status = 200;

		res.status(200).send(
			new SuccessResponse(
				`Updating beer post: ${post._id}`,
				status,
				updateBeerPost,
				req.didTokenRegenerate ? req.newAccessToken : undefined
			)
		);
	} catch (error) {
		if (error.name === 'CastError') {
			next(new ServerError('Your update was rejected. ' + error.message, 409));
		}
		next(error);
	}
};

export default updateBeerPost;
