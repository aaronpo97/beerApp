import express from 'express';
import multer from 'multer';

// ----- Controllers ----- //
import uploadImages from '../controllers/images/uploadImages';
import viewImage from '../controllers/images/viewImage';
import deleteImage from '../controllers/images/deleteImage';

// ----- Middleware ----- //
import verifyAccessToken from '../middleware/auth/verifyAccessToken';
import checkTokens from '../middleware/auth/checkTokens';

// ----- Utilities ------ //
import cloudinaryConfig from '../utilities/cloudinary/index';
import ServerError from '../utilities/errors/ServerError';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed';

const { storage } = cloudinaryConfig;
const upload = multer({ storage });
const router = express.Router();

router
  .route('/')
  .post(checkTokens, verifyAccessToken, isAccountConfirmed, upload.array('files'), uploadImages)
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
