import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/errors/ServerError.js';
import { boolChecker } from '../../utilities/data/dataUtil.js';

import { SuccessResponse } from '../../utilities/response/responses.js';

const showBeerPost = async (req, res, next) => {
	const { id } = req.params;
	const { query } = req;
	try {
		const payload = !boolChecker(query.populate)
			? await BeerPost.findById(id)
			: await BeerPost.findById(id).populate('brewery').populate('author').populate('images');

		if (!payload) throw new ServerError('Could not find a post with that id.', 404);

		const status = 200;
		res.json(
			new SuccessResponse(
				`Sending data for beerpost '${id}'`,
				status,
				payload,
				req.didTokenRegenerate ? req.accessToken : undefined
			)
		);
	} catch (error) {
		next(error);
	}
};

export default showBeerPost;
