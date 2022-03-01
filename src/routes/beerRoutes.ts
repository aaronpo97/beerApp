import express from 'express';

// ----- Controllers ----- //
import createBeerPost from '../controllers/posts/createBeerPost';
import deleteBeerPost from '../controllers/posts/deleteBeerPost';
import getAllPosts from '../controllers/posts/getAllPosts';
import likeUnlikePost from '../controllers/posts/likeUnlikePost';
import searchBeerPosts from '../controllers/posts/searchBeer';
import showBeerPost from '../controllers/posts/showBeerPost';
import updateBeerPost from '../controllers/posts/updateBeerPost';

// ----- Middleware ----- //
import checkTokens from '../middleware/auth/checkTokens';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed';
import isPostOwner from '../middleware/auth/isPostOwner';
import validateBeerPost from '../middleware/validation/validateBeerPost';
import verifyAccessToken from '../middleware/auth/verifyAccessToken';

// ----- Utilities ------ //
import ServerError from '../utilities/errors/ServerError';

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
