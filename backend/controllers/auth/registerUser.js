import User from '../../database/models/User.js';
import ServerError from '../../utilities/ServerError.js';

const registerUser = async (req, res, next) => {
	try {
		const userToRegister = req.body;
		const { username, email, password } = userToRegister;
		const user = new User({ username, email });
		await User.register(user, password);
		res.status(201).json({ message: 'New user created.', status: 201, success: true });
	} catch (error) {
		next(new ServerError(error.message, 400));
	}
};

export default registerUser;
