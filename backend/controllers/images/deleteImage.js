import Image from '../../database/models/Image.js';
import config from '../../utilities/cloudinary/index.js';
import ServerError from '../../utilities/errors/ServerError.js';

const { cloudinary } = config;
const deleteImage = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(id);
		const imageToDelete = await Image.findByIdAndDelete(id);

		const errorCode = 400;
		if (!imageToDelete)
			throw new ServerError(
				`Cannot delete an image with the id of ${id} as it does not exist.`,
				errorCode
			);
		await cloudinary.uploader.destroy(imageToDelete.filename);

		const successCode = 200;
		res.json({ message: 'Image successfully deleted.' }).status(successCode);
	} catch (error) {
		next(error);
	}
};
export default deleteImage;
