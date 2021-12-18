import ServerError from '../../utilities/errors/ServerError.js';

//todo - delete associated images, beerposts
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
