import express from 'express';

// ----- Controllers ----- //
import deleteComment from '../controllers/comments/deleteComment';
import editComment from '../controllers/comments/editComment';
import postComment from '../controllers/comments/postComment';
import viewComment from '../controllers/comments/viewComment';
import viewPostComments from '../controllers/posts/viewPostComments';

// ----- Middleware ----- //
import checkTokens from '../middleware/auth/checkTokens';
import verifyAccessToken from '../middleware/auth/verifyAccessToken';
import isCommentOwner from '../middleware/auth/isCommentOwner';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed';

// ----- Utilities ------ //
import ServerError from '../utilities/errors/ServerError';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(viewPostComments)
  .post(checkTokens, verifyAccessToken, isAccountConfirmed, postComment)
  .all(() => {
    throw new ServerError('Not allowed', 405);
  });

router
  .route('/:commentId')
  .get(viewComment)
  .put(checkTokens, verifyAccessToken, isCommentOwner, isAccountConfirmed, editComment)
  .delete(checkTokens, verifyAccessToken, isCommentOwner, isAccountConfirmed, deleteComment)
  .all(() => {
    throw new ServerError('Not allowed', 405);
  });

export default router;
