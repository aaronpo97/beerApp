import ServerError from '../../utilities/errors/ServerError.js';

const viewUser = async (req, res, next) => {
	try {
		const userToView = req.queriedUser;
		if (!userToView) {
			throw new ServerError('Cannot find a user with that id.', 401);
		}
		res.json({ message: 'ok', status: 200, payload: userToView });
	} catch (error) {
		next(error);
	}
};

export default viewUser;
