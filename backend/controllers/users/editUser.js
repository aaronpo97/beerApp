import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const editUser = async (req, res, next) => {
	const userUpdates = req.body;
	const updatedUser = await User.findByIdAndUpdate(req.queriedUser._id, userUpdates);

	const status = 200;

	const message = `Successfully edited user: ${updatedUser._id}`;
	const payload = updatedUser.populate('BeerPost');

	res.json(new SuccessResponse(message, status, payload, req.didTokenRegenerate ? req.accessToken : undefined));
};

export default editUser;
