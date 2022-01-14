import Image from '../../database/models/Image.js';
import ServerError from '../../utilities/errors/ServerError.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const viewImage = async (req, res, next) => {
	try {
		const { id } = req.params;
		const image = await Image.findById(id);
		if (!image) throw new ServerError(`Cannot find an image with the id of '${id}'.`, 404);
		const status = 200;
		res.json(
			new SuccessResponse(
				`Sending image: ${image.filename}`,
				status,
				image,
				req.didTokenRegenerate ? req.accessToken : undefined
			)
		).status(status);
	} catch (error) {
		if (error.name === 'CastError') {
			next(new ServerError(`Cannot find an image with the id of '${req.params.id}' as it is invalid.`, 404));
		} else {
			next(error);
		}
	}
};
export default viewImage;
