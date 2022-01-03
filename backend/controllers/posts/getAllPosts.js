import BeerPost from '../../database/models/BeerPost.js';
import { boolChecker } from '../../utilities/data/dataUtil.js';
import sort from '../../utilities/data/sorter.js';

const getAllPosts = async (req, res, next) => {
	try {
		const { query } = req;
		const allPosts = !boolChecker(req.query.populate)
			? await BeerPost.find()
			: await BeerPost.find()
					.populate('brewery')
					.populate('images')
					.populate('author');

		const status = 200;

		const payload = sort(allPosts, req.query.sort, req.query.param);
		const resBody = {
			status,
			payload,
			newAccessToken: req.didTokenRegenerate ? req.accessToken : undefined,
			message: 'ok',
		};

		res.json(resBody).status(status);
	} catch (error) {
		next(error);
	}
};

export default getAllPosts;
