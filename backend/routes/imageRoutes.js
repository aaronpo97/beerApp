import express from 'express';
import cloudinaryConfig from '../utilities/cloudinary/index.js';
import multer from 'multer';

import verifyJWT from '../middleware/auth/verifyJWT.js';
import uploadImages from '../controllers/images/uploadImages.js';
import viewImage from '../controllers/images/viewImage.js';
import deleteImage from '../controllers/images/deleteImage.js';

const { storage } = cloudinaryConfig;
const upload = multer({ storage });
const router = express.Router();

router.route('/').post(verifyJWT, upload.array('files'), uploadImages);
router.route('/:id').get(verifyJWT, viewImage).delete(verifyJWT, deleteImage);

export default router;
