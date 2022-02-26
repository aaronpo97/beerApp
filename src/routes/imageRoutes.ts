import express from 'express';
import multer from 'multer';

// ----- Controllers ----- //
import uploadImages from '../controllers/images/uploadImages.js';
import viewImage from '../controllers/images/viewImage.js';
import deleteImage from '../controllers/images/deleteImage.js';

// ----- Middleware ----- //
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import checkTokens from '../middleware/auth/checkTokens.js';

// ----- Utilities ------ //
import cloudinaryConfig from '../utilities/cloudinary/index.js';
import ServerError from '../utilities/errors/ServerError.js';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed.js';

const { storage } = cloudinaryConfig;
const upload = multer({ storage });
const router = express.Router();

router
  .route('/')
  .post(
    // checkTokens, verifyAccessToken, isAccountConfirmed,
    upload.array('files'),
    uploadImages,
  )
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });
router
  .route('/:id')
  .get(viewImage)
  .delete(verifyAccessToken, deleteImage)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

export default router;
