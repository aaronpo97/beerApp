import express from 'express';

// ----- Controllers ----- //
import createBeerPost from '../controllers/posts/createBeerPost.js';
import deleteBeerPost from '../controllers/posts/deleteBeerPost.js';
import getAllPosts from '../controllers/posts/getAllPosts.js';
import likeUnlikePost from '../controllers/posts/likeUnlikePost.js';
import searchBeerPosts from '../controllers/posts/searchBeer.js';
import showBeerPost from '../controllers/posts/showBeerPost.js';
import updateBeerPost from '../controllers/posts/updateBeerPost.js';

// ----- Middleware ----- //
import checkTokens from '../middleware/auth/checkTokens.js';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed.js';
import isPostOwner from '../middleware/auth/isPostOwner.js';
import validateBeerPost from '../middleware/validation/validateBeerPost.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';

// ----- Utilities ------ //
import ServerError from '../utilities/errors/ServerError.js';

const router = express.Router();

router
  .route('/')
  .get(getAllPosts)
  .post(checkTokens, verifyAccessToken, isAccountConfirmed, validateBeerPost, createBeerPost)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/search')
  .get(searchBeerPosts)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/:id')
  .get(showBeerPost)
  .put(checkTokens, verifyAccessToken, isPostOwner, isAccountConfirmed, updateBeerPost)
  .delete(checkTokens, verifyAccessToken, isPostOwner, isAccountConfirmed, deleteBeerPost)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/:id/like')
  .put(checkTokens, verifyAccessToken, isAccountConfirmed, likeUnlikePost)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

export default router;
