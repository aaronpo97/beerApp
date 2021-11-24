import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../database/models/User.js';

import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	const dbUser = await User.findOne({ username });
	if (!dbUser) return res.json({ message: 'Invalid username.' });

	const isCorrect = await bcrypt.compare(password, dbUser.password);

	if (isCorrect) {
		const payload = {
			id: dbUser._id,
			username: dbUser.username,
		};

		jwt.sign(payload, JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
			if (err) return res.json({ message: err });
			return res.json({ message: 'Success', token: `Bearer ${token}` });
		});
		//
	} else {
		return res.json({ message: 'Invalid username or password. ' });
	}
};

export default loginUser;
