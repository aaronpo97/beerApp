import User from '../../database/models/User.js';
import ServerError from '../../utilities/ServerError.js';

const viewUser = async (req, res, next) => {
	try {
		const userToView = req.queriedUser;
		if (!userToView) {
			throw new ServerError('Cannot find a user with that id.', 401);
		}

		res.json({ message: 'ok', status: 200, payload: userToView });
	} catch (error) {
		if (error.type === 'CastError') {
			next(
				new ServerError(
					'Cannot find a user with that id as it is invalid.',
					400
				)
			);
		}
		next(error);
	}
};

export default viewUser;
