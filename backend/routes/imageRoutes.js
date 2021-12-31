import express from 'express';
import cloudinaryConfig from '../utilities/cloudinary/index.js';
import multer from 'multer';

import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import checkTokens from '../middleware/auth/checkTokens.js';

import uploadImages from '../controllers/images/uploadImages.js';
import viewImage from '../controllers/images/viewImage.js';
import deleteImage from '../controllers/images/deleteImage.js';
import ServerError from '../utilities/errors/ServerError.js';

const { storage } = cloudinaryConfig;
const upload = multer({ storage });
const router = express.Router();

router
	.route('/')
	.get(() => {
		throw new ServerError('Not allowed.', 405);
	})
	.post(checkTokens, verifyAccessToken, upload.array('files'), uploadImages);
router
	.route('/:id')
	.get(verifyAccessToken, viewImage)
	.delete(verifyAccessToken, deleteImage);

export default router;
