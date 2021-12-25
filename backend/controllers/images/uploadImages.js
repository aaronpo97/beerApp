import Image from '../../database/models/Image.js';
import ServerError from '../../utilities/errors/ServerError.js';
const uploadImages = async (req, res, next) => {
	try {
		console.log(req.files);
		if (!req.files.length) throw new ServerError('No files have been uploaded.', 400);

		let images = [];
		for (let file of req.files) {
			const imageToUpload = new Image({
				filename: file.filename,
				url: file.path,
				uploadedBy: req.currentUser,
			});
			images.push(imageToUpload);
			await imageToUpload.save();
		}

		const status = 201;
		const fileCount = req.files.length;
		res.status(status).json({
			status,
			message: `Uploaded ${fileCount} image${fileCount > 1 ? 's' : ''}`,
			payload: images,
		});
	} catch (error) {
		next(error);
	}
};

export default uploadImages;
