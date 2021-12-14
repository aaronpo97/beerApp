import express from 'express';

import verifyJWT from '../middleware/auth/verifyJWT.js';
import showAllBreweries from '../controllers/brewery/showAllBreweries.js';
import createBrewery from '../controllers/brewery/createBrewery.js';
import viewBrewery from '../controllers/brewery/viewBrewery.js';
import deleteBrewery from '../controllers/brewery/deleteBrewery.js';

const router = express.Router();

router.route('/').get(verifyJWT, showAllBreweries).post(verifyJWT, createBrewery);
router.route('/:id').get(viewBrewery).delete(deleteBrewery);

export default router;
