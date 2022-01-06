import express from 'express';

import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import checkTokens from '../middleware/auth/checkTokens.js';

import showAllBreweries from '../controllers/brewery/showAllBreweries.js';
import createBrewery from '../controllers/brewery/createBrewery.js';
import viewBrewery from '../controllers/brewery/viewBrewery.js';
import deleteBrewery from '../controllers/brewery/deleteBrewery.js';
import updateBrewery from '../controllers/brewery/updateBrewery.js';

import validateBrewery from '../middleware/validation/validateBrewery.js';

const router = express.Router();

router
	.route('/')
	.get(checkTokens, verifyAccessToken, showAllBreweries)
	.post(checkTokens, verifyAccessToken, validateBrewery, createBrewery)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});
router
	.route('/:id')
	.get(checkTokens, verifyAccessToken, viewBrewery)
	.put(checkTokens, verifyAccessToken, updateBrewery)
	.delete(checkTokens, verifyAccessToken, deleteBrewery)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

export default router;
