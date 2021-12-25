import ServerError from '../../utilities/errors/ServerError.js';
import BeerPost from '../../database/models/BeerPost.js';
import Image from '../../database/models/Image.js';
import Brewery from '../../database/models/Brewery.js';
import config from '../../utilities/cloudinary/index.js';

const { cloudinary } = config;

const deleteUser = async (req, res, next) => {
	try {
		if (!req.currentUser) throw new ServerError('Cannot delete user.', 412);

		const beerPosts = await BeerPost.find({ author: req.currentUser });
		const images = await Image.find({ uploadedBy: req.currentUser });

		const afilliatedBrewery = req.currentUser.profile.affiliation
			? await Brewery.findById(req.currentUser.profile.affiliation.toString())
			: null;

		for (let post of beerPosts) {
			await Brewery.findByIdAndUpdate(post.brewery.toString(), {
				$pull: { beers: post._id },
			});
			await post.delete();
		}
		for (let image of images) {
			await cloudinary.uploader.destroy(image.filename);
			await image.delete();
		}
		for (let image of images) {
			await image.delete();
		}

		if (afilliatedBrewery) {
			await afilliatedBrewery.updateOne({
				$pull: { associatedProfiles: req.currentUser._id },
			});
		}

		const status = 200;

		await req.currentUser.delete();
		res.status(status).json({ status, message: 'Successfully deleted user.' });
	} catch (error) {
		next(error);
	}
};

export default deleteUser;
