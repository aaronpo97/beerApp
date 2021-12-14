import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/ServerError.js';
import Brewery from '../../database/models/Brewery.js';

const createBeerPost = async (req, res, next) => {
	try {
		const {
			name,
			type,
			description,
			brewery: breweryID,
			location,
			image,
			abv,
			ibu,
		} = req.body;

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

		//send the response
		res.status(201).json({ message: 'ok', status: 201, payload: post });
	} catch (error) {
		switch (error.name) {
			case 'ValidationError':
				next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
				break;
			case 'CastError':
				next(new ServerError(`Cannot create beer post. ${error.message}`, 401));
			default:
				break;
		}
	}
};

export default createBeerPost;
