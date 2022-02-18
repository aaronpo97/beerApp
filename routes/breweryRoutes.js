import express from 'express';

// ----- Controllers ----- //
import createBrewery from '../controllers/brewery/createBrewery.js';
import deleteBrewery from '../controllers/brewery/deleteBrewery.js';
import showAllBreweries from '../controllers/brewery/showAllBreweries.js';
import updateBrewery from '../controllers/brewery/updateBrewery.js';
import viewBrewery from '../controllers/brewery/viewBrewery.js';

// ----- Middleware ----- //
import checkTokens from '../middleware/auth/checkTokens.js';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed.js';
import validateBrewery from '../middleware/validation/validateBrewery.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';

// ----- Utilities ------ //
import ServerError from '../utilities/errors/ServerError.js';

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
