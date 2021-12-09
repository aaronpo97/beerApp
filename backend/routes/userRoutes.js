import express from 'express';

import viewUser from '../controllers/users/viewUser.js';

import isUserAuthorized from '../middleware/auth/isUserAuthorized.js';
import verifyJWT from '../middleware/auth/verifyJWT.js';

import deleteUser from '../controllers/users/deleteUser.js';

const router = express.Router();

router
	.route('/:id')
	.get(verifyJWT, isUserAuthorized, viewUser)
	.delete(verifyJWT, isUserAuthorized, deleteUser)
	.put(verifyJWT, isUserAuthorized, async (req, res, next) => {
		const userToEdit = req.queriedUser;

		console.log(userToEdit);
		res.json({ message: 'editing a user' });
	});

export default router;
