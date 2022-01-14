import BeerPost from '../../database/models/BeerPost.js';
import { boolChecker } from '../../utilities/data/dataUtil.js';
import sort from '../../utilities/data/sorter.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const getAllPosts = async (req, res, next) => {
	try {
		const { query } = req;
		const allPosts = !boolChecker(req.query.populate)
			? await BeerPost.find()
			: await BeerPost.find().populate('brewery').populate('images').populate('postedBy');

		const status = 200;
		const payload = sort(allPosts, query.sort, query.param);
		const message = `Sending beer index.${
			req.query.sort && req.query.param
				? ` Sorting by ${req.query.param} in ${req.query.sort} order.`
				: ''
		}`;

		res.json(
			new SuccessResponse(
				message,
				status,
				payload,
				req.didTokenRegenerate ? req.accessToken : undefined
			)
		).status(status);
	} catch (error) {
		next(error);
	}
};

export default getAllPosts;
