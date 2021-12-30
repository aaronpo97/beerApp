import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';

const getAllPosts = async (req, res) => {
	const allPosts = await BeerPost.find().populate('brewery');

	res.json({
		message: 'ok',
		newAccessToken: req.didTokenRegenerate ? req.accessToken : null,
		payload: allPosts,
		status: 200,
	}).status(200);
};

export default getAllPosts;
