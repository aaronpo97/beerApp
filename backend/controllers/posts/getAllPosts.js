import BeerPost from '../../database/models/BeerPost.js';

export default async (req, res) => {
	const allPosts = await BeerPost.find();
	res.send(allPosts);
};
