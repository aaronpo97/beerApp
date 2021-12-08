import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

import viewUser from '../controllers/users/viewUser.js';

import dotenv from 'dotenv';
import ServerError from '../utilities/ServerError.js';
dotenv.config();

const { JWT_SECRET } = process.env;

const authenticateUser = (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];
		const decoded = jwt.verify(token, JWT_SECRET);

		console.log(decoded);
		next();
	} catch (error) {
		if ((error.type = 'JsonWebTokenError')) {
			throw new ServerError('Invalid signature.', 401);
		}
	}
};

router
	.route('/:id')
	.get(authenticateUser, viewUser)
	.delete((req, res) => res.send('hi'));

export default router;
