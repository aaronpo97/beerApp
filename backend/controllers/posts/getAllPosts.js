import BeerPost from '../../database/models/BeerPost.js';

const getAllPosts = async (req, res) => {
	const allPosts = await BeerPost.find();
	res.json(allPosts);
};

export default getAllPosts;
