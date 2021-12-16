import express from 'express';
import cloudinaryConfig from '../utilities/cloudinary/index.js';
import multer from 'multer';

import verifyJWT from '../middleware/auth/verifyJWT.js';

import Image from '../database/models/Image.js';
import ServerError from '../utilities/ServerError.js';

const { storage } = cloudinaryConfig;
const upload = multer({ storage });
const router = express.Router();

const uploadImages = async (req, res, next) => {
	try {
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
		res.status(status).json({
			status,
			message:
				req.files.length > 1
					? `Uploaded ${req.files.length} images.`
					: 'Uploaded 1 image.',
			payload: images,
		});
	} catch (error) {
		next(error);
	}
};

router.route('/').post(verifyJWT, upload.array('files'), uploadImages);

export default router;
