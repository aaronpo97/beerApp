import User from '../../database/models/User.js';
import ServerError from '../../utilities/ServerError.js';

const editUser = async (req, res, next) => {
	const userUpdates = req.body;
	const updatedUser = await User.findByIdAndUpdate(req.queriedUser._id, userUpdates);

	res.json({
		message: 'Successfully edited user.',
		status: 200,
		payload: updatedUser.populate('BeerPost'),
	});
};

export default editUser;
