import express from 'express';

// ----- Controllers ----- //
import createBrewery from '../controllers/brewery/createBrewery';
import deleteBrewery from '../controllers/brewery/deleteBrewery';
import showAllBreweries from '../controllers/brewery/showAllBreweries';
import updateBrewery from '../controllers/brewery/updateBrewery';
import viewBrewery from '../controllers/brewery/viewBrewery';

// ----- Middleware ----- //
import checkTokens from '../middleware/auth/checkTokens';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed';
import validateBrewery from '../middleware/validation/validateBrewery';
import verifyAccessToken from '../middleware/auth/verifyAccessToken';

// ----- Utilities ------ //
import ServerError from '../utilities/errors/ServerError';

const router = express.Router();

router
  .route('/')
  .get(showAllBreweries)
  .post(checkTokens, verifyAccessToken, validateBrewery, isAccountConfirmed, createBrewery)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });
router
  .route('/:id')
  .get(viewBrewery)
  .put(checkTokens, verifyAccessToken, isAccountConfirmed, updateBrewery)
  .delete(checkTokens, verifyAccessToken, isAccountConfirmed, deleteBrewery)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

export default router;
