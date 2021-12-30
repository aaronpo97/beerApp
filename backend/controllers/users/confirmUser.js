import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

const confirmUser = async (req, res, next) => {
	try {
		const { userID, token } = req.params;

		const decoded = jwt.verify(token, 'this-should-be-a-better-secret');

		const userToConfirm = await User.findById(userID);
		if (userToConfirm.isAccountConfirmed === true) throw new ServerError('Account is already confirmed', 400);

		const decodedUser = await User.findById(decoded.id);

		if (!(decodedUser === userToConfirm)) throw new ServerError('Invalid link', 400);

		userToConfirm.isAccountConfirmed = true;

		await userToConfirm.save();

		res.json({ message: 'Account confirmed.' });
	} catch (error) {
		if (error.name === 'CastError') {
			next(new ServerError('Invalid user id detected. Unable to authenticate user.', 400));
		}
		next(error);
	}
};

export default confirmUser;
