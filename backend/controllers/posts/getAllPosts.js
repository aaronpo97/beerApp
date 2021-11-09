import BeerPost from '../../database/models/BeerSchema.js';

export default async (req, res) => {
	const allPosts = await BeerPost.find();
	res.send(allPosts);
};
