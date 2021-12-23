import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';

import ServerError from '../../utilities/errors/ServerError.js';

const createBeerPost = async (req, res, next) => {
	try {
		const { name, type, description, abv, ibu, images, brewery: breweryID } = req.body;

		const brewery = await Brewery.findById(breweryID);
		if (!brewery) throw new ServerError('Cannot find a brewery with that id.', 404);

		//create the post
		const post = new BeerPost({
			name,
			type,
			description,
			brewery,
			images,
			abv,
			ibu,
			author: req.currentUser,
		});
		await post.save();

		//add the post to the brewery object
		brewery.beers.push(post);
		await brewery.save();
		console.log('successfully saved beer to brewery');

		//add the post to the user object
		req.currentUser.posts.push(post);
		await req.currentUser.save();
		console.log('successfully saved beer to user');

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
