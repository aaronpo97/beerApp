import express from 'express';

import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import checkTokens from '../middleware/auth/checkTokens.js';

import showAllBreweries from '../controllers/brewery/showAllBreweries.js';
import createBrewery from '../controllers/brewery/createBrewery.js';
import viewBrewery from '../controllers/brewery/viewBrewery.js';
import deleteBrewery from '../controllers/brewery/deleteBrewery.js';
import updateBrewery from '../controllers/brewery/updateBrewery.js';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed.js';
import validateBrewery from '../middleware/validation/validateBrewery.js';

const router = express.Router();

router
   .route('/')
   .get(checkTokens, verifyAccessToken, isAccountConfirmed, showAllBreweries)
   .post(checkTokens, verifyAccessToken, validateBrewery, isAccountConfirmed, createBrewery)
   .all(() => {
      throw new ServerError('Not allowed.', 405);
   });
router
   .route('/:id')
   .get(checkTokens, verifyAccessToken, isAccountConfirmed, viewBrewery)
   .put(checkTokens, verifyAccessToken, isAccountConfirmed, updateBrewery)
   .delete(checkTokens, verifyAccessToken, isAccountConfirmed, deleteBrewery)
   .all(() => {
      throw new ServerError('Not allowed.', 405);
   });

export default router;
