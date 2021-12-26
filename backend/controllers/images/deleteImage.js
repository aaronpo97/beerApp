import Image from '../../database/models/Image.js';
import ServerError from '../../utilities/errors/ServerError.js';
import imageDeleter from '../../utilities/deletion/deleteImage.js';
const deleteImage = async (req, res, next) => {
	try {
		const { id } = req.params;
		const imageToDelete = await Image.findById(id);
		const errorMessage = `Cannot delete an image with the id of ${id} as it does not exist.`;
		const errorCode = 404;

		if (!imageToDelete) throw new ServerError(errorMessage, errorCode);
		await imageDeleter(imageToDelete);

		const successMessage = `Image successfully deleted`;
		const successCode = 200;
		res.json({ message: successMessage }).status(successCode);
	} catch (error) {
		next(error);
	}
};
export default deleteImage;
