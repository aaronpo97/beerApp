import express from 'express';

import checkTokens from '../middleware/auth/checkTokens.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import isCommentOwner from '../middleware/auth/isCommentOwner.js';

import postComment from '../controllers/comments/postComment.js';
import viewComment from '../controllers/comments/viewComment.js';

import ServerError from '../utilities/errors/ServerError.js';

import deleteComment from '../controllers/comments/deleteComment.js';
import editComment from '../controllers/comments/editComment.js';

const router = express.Router({ mergeParams: true });

router
   .route('/')
   .post(checkTokens, verifyAccessToken, postComment)
   .all(() => {
      throw new ServerError('Not allowed', 405);
   });

router
   .route('/:commentId')
   .get(checkTokens, verifyAccessToken, viewComment)
   .put(checkTokens, verifyAccessToken, isCommentOwner, editComment)
   .delete(checkTokens, verifyAccessToken, isCommentOwner, deleteComment)
   .all(() => {
      throw new ServerError('Not allowed', 405);
   });

export default router;
