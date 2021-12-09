import ServerError from '../../utilities/ServerError.js';

const deleteUser = async (req, res, next) => {
	try {
		if (!req.currentUser) throw new ServerError('Cannot delete user.', 412);
		req.currentUser.delete();
		res.json({ message: 'User deleted.', status: 200, success: true });
	} catch (error) {
		next(error);
	}
};

export default deleteUser;
