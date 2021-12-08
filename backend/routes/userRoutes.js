import express from 'express';
import jwt, { decode } from 'jsonwebtoken';

const router = express.Router();

import viewUser from '../controllers/users/viewUser.js';

import dotenv from 'dotenv';
import ServerError from '../utilities/ServerError.js';
import User from '../database/models/User.js';
dotenv.config();

const { JWT_SECRET } = process.env;

const verifyJWT = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = await User.findById(decoded.id);

		next();
	} catch (error) {
		if ((error.type = 'JsonWebTokenError')) {
			next(new ServerError('Invalid signature.', 401));
		}
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];
		const decodedToken = jwt.verify(token, JWT_SECRET);
		console.log(decodedToken.id);
	} catch (error) {
		next(error);
	}
};

router.route('/:id').get(verifyJWT, viewUser).delete(verifyJWT, deleteUser);

export default router;
