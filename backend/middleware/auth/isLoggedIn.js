import ServerError from '../../utilities/ServerError.js';

const isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) throw new ServerError('You must be authenticated.', 401);
	next();
};

export default isLoggedIn;
