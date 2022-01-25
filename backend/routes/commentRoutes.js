import express from 'express';

import checkTokens from '../middleware/auth/checkTokens.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import postComment from '../controllers/comments/postComment.js';
import ServerError from '../utilities/errors/ServerError.js';
const router = express.Router({ mergeParams: true });
router
   .route('/')
   .post(checkTokens, verifyAccessToken, postComment)
   .all(() => {
      throw new ServerError('Not allowed', 405);
   });

export default router;
