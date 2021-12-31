import BeerPost from '../../database/models/BeerPost.js';
import { populateData } from '../../utilities/data/dataUtil.js';

const getAllPosts = async (req, res) => {
	try {
		const allPosts = !populateData(req.query.populate)
			? await BeerPost.find()
			: await BeerPost.find()
					.populate('brewery')
					.populate('images')
					.populate('author');

		const status = 200;
		console.log(
			allPosts.sort(function (a, b) {
				return a.name - b.name;
			})
		);
		const resBody = {
			status,
			message: 'ok',
			payload: allPosts,
		};
		resBody.newAccessToken = req.didTokenRegenerate ? req.accessToken : undefined;
		res.json(resBody).status(status);
	} catch (error) {
		next(error);
	}
};

export default getAllPosts;
