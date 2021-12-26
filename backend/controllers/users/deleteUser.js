import ServerError from '../../utilities/errors/ServerError.js';
import BeerPost from '../../database/models/BeerPost.js';
import Image from '../../database/models/Image.js';
import Brewery from '../../database/models/Brewery.js';

import deletePost from '../../utilities/deletion/deletePost.js';
import deleteImage from '../../utilities/deletion/deleteImage.js';

const deleteUser = async (req, res, next) => {
	try {
		if (!req.currentUser) throw new ServerError('Cannot delete user.', 412);

		const beerPosts = await BeerPost.find({ author: req.currentUser });
		const images = await Image.find({ uploadedBy: req.currentUser });

		const { affiliaton } = req.currentUser.profile;

		const affiliatonId = affiliaton ? affiliaton.toString() : null;
		const afilliatedBrewery = affiliaton ? await Brewery.findById(affiliatonId) : null;

		for (let post of beerPosts) await deletePost(post);
		for (let image of images) await deleteImage(image);

		if (afilliatedBrewery) {
			await afilliatedBrewery.updateOne({ $pull: { associatedProfiles: req.currentUser._id } });
		}
		await req.currentUser.delete();

		const status = 200;
		res.status(status).json({ status, message: 'Successfully deleted user.' });
	} catch (error) {
		next(error);
	}
};
export default deleteUser;
