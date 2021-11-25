import ServerError from '../../utilities/ServerError.js';

const logoutUser = (req, res, next) => {
	try {
		req.logout();
		res.json({ message: 'logout successful.' });
	} catch (err) {
		next(new ServerError('Could not logout.'), 401);
	}
};

export default logoutUser;
