import ServerError from '../../utilities/ServerError.js';
import User from '../../database/models/User.js';

const authenticate = async (userID, confirmPhrase) => {
	if (confirmPhrase !== 'dog') return Promise.reject(new ServerError('Incorrect confirmation phrase.', 432));

	return Promise.resolve(`${userID} authenticated.`);
};

const confirmUser = async (req, res, next) => {
	try {
		const { userID, confirmPhrase } = req.body;
		if (!(userID && confirmPhrase)) throw new ServerError(`Unable to authenticate user.`, 400);
		const isAuthenticated = await authenticate(userID, confirmPhrase);
		console.log(isAuthenticated);

		const userToAuthenticate = await User.findById({ _id: userID });
		userToAuthenticate.accountConfirmed = true;

		await userToAuthenticate.save();

		res.json({ message: 'User confirmed. ', success: true });
	} catch (err) {
		next(err);
	}
};

export default confirmUser;
