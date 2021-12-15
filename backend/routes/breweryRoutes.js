import express from 'express';

import verifyJWT from '../middleware/auth/verifyJWT.js';
import showAllBreweries from '../controllers/brewery/showAllBreweries.js';
import createBrewery from '../controllers/brewery/createBrewery.js';
import viewBrewery from '../controllers/brewery/viewBrewery.js';
import deleteBrewery from '../controllers/brewery/deleteBrewery.js';
import updateBrewery from '../controllers/brewery/updateBrewery.js';

const router = express.Router();

router.route('/').get(verifyJWT, showAllBreweries).post(verifyJWT, createBrewery);
router
	.route('/:id')
	.get(verifyJWT, viewBrewery)
	.put(verifyJWT, updateBrewery)
	.delete(verifyJWT, deleteBrewery);

export default router;
