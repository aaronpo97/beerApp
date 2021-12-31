import express from 'express';

import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import checkTokens from '../middleware/auth/checkTokens.js';

import showAllBreweries from '../controllers/brewery/showAllBreweries.js';
import createBrewery from '../controllers/brewery/createBrewery.js';
import viewBrewery from '../controllers/brewery/viewBrewery.js';
import deleteBrewery from '../controllers/brewery/deleteBrewery.js';
import updateBrewery from '../controllers/brewery/updateBrewery.js';

const router = express.Router();

router
	.route('/')
	.get(checkTokens, verifyAccessToken, showAllBreweries)
	.post(checkTokens, verifyAccessToken, createBrewery);
router
	.route('/:id')
	.get(checkTokens, verifyAccessToken, viewBrewery)
	.put(checkTokens, verifyAccessToken, updateBrewery)
	.delete(checkTokens, verifyAccessToken, deleteBrewery);

export default router;
