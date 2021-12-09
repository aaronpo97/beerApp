import User from '../../database/models/User.js';
import Profile from '../../database/models/Profile.js';
import ServerError from '../../utilities/ServerError.js';

const registerUser = async (req, res, next) => {
	try {
		const userToRegister = req.body;
		const { username, email, password, dateOfBirth } = userToRegister;

		const user = new User({ username, email, dateOfBirth, profile: null });
		const profile = new Profile({ about: '', occupation: '', user });

		user.profile = profile;

		await profile.save();
		await User.register(user, password);
		await user.save();

		const newUser = await User.findById(user._id);

		const populatedNewUser = await newUser.populate('profile');

		res.json({
			message: 'New user created.',
			status: 201,
			success: true,
			populatedNewUser,
		});
	} catch (error) {
		next(new ServerError(error.message, 400));
	}
};

export default registerUser;
