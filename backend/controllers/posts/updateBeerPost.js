import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/errors/ServerError.js';

const updateBeerPost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findById(id);
		const updatedBeer = req.body;

		const { name, type, description, brewery, location, image, abv, ibu } = updatedBeer;

		if (!post)
			throw new ServerError(`Could not edit post id:${id} as it cannot be found.`, 404);

		post.name = name;
		post.type = type;
		post.description = description;
		post.brewery = brewery;
		post.location = location;
		post.image = image;
		post.abv = abv;
		post.ibu = ibu;

		await post.save();

		res.redirect(`/beer/${id}`);
	} catch (error) {
		next(error);
	}
};

export default updateBeerPost;
