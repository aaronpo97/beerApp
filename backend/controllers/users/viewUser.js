import User from '../../database/models/User.js';
import ServerError from '../../utilities/ServerError.js';

const viewUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById({ _id: id });

		if (!user) throw new ServerError('Cannot find a user with that id.', 401);

		res.json({ message: 'ok', status: 200, payload: user });
	} catch (error) {
		if ((error.type = 'CastError')) {
			next(new ServerError('Cannot find a user with that id as it is invalid.', 400));
		}
		next(error);
	}
};

export default viewUser;
