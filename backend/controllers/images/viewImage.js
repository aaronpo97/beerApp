import Image from '../../database/models/Image.js';
import ServerError from '../../utilities/errors/ServerError.js';

const viewImage = async (req, res, next) => {
	try {
		const { id } = req.params;
		const image = await Image.findById(id);
		if (!image) throw new ServerError(`Cannot find an image with the id of '${id}'.`, 404);

		res.json(image);
	} catch (error) {
		if (error.name === 'CastError') {
			next(
				new ServerError(
					`Cannot find an image with the id of '${req.params.id}' as it is invalid.`,
					404
				)
			);
		} else {
			next(error);
		}
	}
};
export default viewImage;
