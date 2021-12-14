import express from 'express';

import verifyJWT from '../middleware/auth/verifyJWT.js';
import showAllBreweries from '../controllers/brewery/showAllBreweries.js';
import createBrewery from '../controllers/brewery/createBrewery.js';
import viewBrewery from '../controllers/brewery/viewBrewery.js';
import deleteBrewery from '../controllers/brewery/deleteBrewery.js';
import Brewery from '../database/models/Brewery.js';
import ServerError from '../utilities/ServerError.js';

const router = express.Router();

const updateBrewery = async (req, res, next) => {
	try {
		const { id } = req.params;

		const brewery = await Brewery.findByIdAndUpdate(id, req.body);
		if (!brewery)
			throw new ServerError(
				`Cannot update the brewery with the id of ${id} as it could not be found.`,
				404
			);

		const updatedBrewery = await Brewery.findById(id);

		res.json({ message: 'Updating a brewery!', payload: { updatedBrewery } });
	} catch (error) {
		next(error);
	}
};

router.route('/').get(verifyJWT, showAllBreweries).post(verifyJWT, createBrewery);
router
	.route('/:id')
	.get(verifyJWT, viewBrewery)
	.put(verifyJWT, updateBrewery)
	.delete(verifyJWT, deleteBrewery);

export default router;
