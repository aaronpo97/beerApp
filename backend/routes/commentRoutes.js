import express from 'express';

// ----- Controllers ----- //
import deleteComment from '../controllers/comments/deleteComment.js';
import editComment from '../controllers/comments/editComment.js';
import postComment from '../controllers/comments/postComment.js';
import viewComment from '../controllers/comments/viewComment.js';

// ----- Middleware ----- //
import checkTokens from '../middleware/auth/checkTokens.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import isCommentOwner from '../middleware/auth/isCommentOwner.js';

// ----- Utilities ------ //
import ServerError from '../utilities/errors/ServerError.js';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(checkTokens, verifyAccessToken, isAccountConfirmed, postComment)
  .all(() => {
    throw new ServerError('Not allowed', 405);
  });

router
  .route('/:commentId')
  .get(checkTokens, verifyAccessToken, isAccountConfirmed, viewComment)
  .put(checkTokens, verifyAccessToken, isCommentOwner, isAccountConfirmed, editComment)
  .delete(checkTokens, verifyAccessToken, isCommentOwner, isAccountConfirmed, deleteComment)
  .all(() => {
    throw new ServerError('Not allowed', 405);
  });

export default router;
