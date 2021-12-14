import BeerPost from '../../database/models/BeerPost.js';

const getAllPosts = async (req, res) => {
	const allPosts = await BeerPost.find();
	res.json({ message: 'ok', payload: allPosts, status: 200 }).status(200);
};

export default getAllPosts;
