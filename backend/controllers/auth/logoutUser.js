import ServerError from '../../utilities/ServerError.js';

const logoutUser = (req, res, next) => {
	try {
		req.logout();
		res.json({ message: 'User logged out.', success: true });
	} catch (err) {
		next(new ServerError('Could not logout.'), 401);
	}
};

export default logoutUser;
