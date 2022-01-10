import ServerError from '../utilities/errors/ServerError.js';
import BeerPost from '../database/models/BeerPost.js';
import { SuccessResponse } from '../utilities/response/responses.js';

const likeUnlikePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const beer = await BeerPost.findById(id);
		const { currentUser } = req;

		const isPostLikedByUser = currentUser.profile.likes
			.map(objectID => objectID.toString())
			.includes(beer._id.toString());

		const isUserListed = beer.likedBy
			.map(objID => objID.toString())
			.includes(currentUser._id.toString());

		if (isPostLikedByUser && isUserListed) {
			console.log(beer.likedBy, beer.name);
			beer.update({ name: 'fuckers' });

			await beer.save();
			const status = 204;
			res.json(new SuccessResponse(`Successfully unliked post.`, status));
		} else {
			beer.likedBy.push(currentUser);
			currentUser.profile.likes.push(beer);
			await currentUser.save();
			await beer.save();

			const status = 204;
			res.json(new SuccessResponse(`Succesfully liked post '${beer.name}'`, status));
		}
	} catch (error) {
		next(error);
	}
};

export default likeUnlikePost;
