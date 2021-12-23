import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

const registerUser = async (req, res, next) => {
	try {
		const userToRegister = req.body;
		const { username, email, password, dateOfBirth, profile } = userToRegister;
		const user = new User({
			username,
			email,
			dateOfBirth,
			profile,
		});

		await User.register(user, password);
		await user.save();

		const newUser = await User.findById(user._id);

		const status = 201;
		res.status(status).json({
			message: 'New user created.',
			status,
			success: true,
			newUser,
		});
	} catch (error) {
		next(new ServerError(error.message, 400));
	}
};

export default registerUser;
