import ServerError from '../../utilities/errors/ServerError.js';
import User from '../../database/models/User.js';

const canAccessUserInfo = async (req, res, next) => {
	try {
		const { id } = req.params;
		req.queriedUser = await User.findById({ _id: id });
		if (!req.queriedUser) {
			throw new ServerError('Unable to locate a user with that id.', 404);
		}

		if (req.currentUser._id.toString() !== req.queriedUser._id.toString()) {
			throw new ServerError('You are not permitted to do that.', 403);
		}
		next();
	} catch (error) {
		if (error.name === 'CastError') {
			next(new ServerError('Cannot find a user with that id as it is invalid.', 404));
		}
		next(error);
	}
};

export default canAccessUserInfo;
