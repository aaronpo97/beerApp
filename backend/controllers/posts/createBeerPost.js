import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';

import ServerError from '../../utilities/ServerError.js';

const createBeerPost = async (req, res, next) => {
	try {
		const { name, type, description, brewery: breweryID, location, image, abv, ibu } = req.body;

		const brewery = await Brewery.findById(breweryID);
		if (!brewery) throw new ServerError('Cannot find a brewery with that id.', 404);

		//create the post
		const post = new BeerPost({
			name,
			type,
			description,
			brewery,
			location,
			image,
			abv,
			ibu,
			author: req.currentUser,
		});
		await post.save();

		//add the post to the brewery object
		brewery.beers.push(post);
		await brewery.save();

		//add the post to the user object
		req.currentUser.posts.push(post);
		await req.currentUser.save();

		//send the response
		const status = 201;
		res.status(status).json({ message: 'ok', status, payload: post });
	} catch (error) {
		switch (error.name) {
			case 'ValidationError':
				next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
				break;
			case 'CastError':
				next(new ServerError(`Cannot create beer post. ${error.message}`, 401));
			default:
				next(error);
				break;
		}
	}
};

export default createBeerPost;
