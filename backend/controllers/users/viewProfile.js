import { SuccessResponse } from '../../utilities/response/responses.js';
import User from '../../database/models/User.js';

const viewProfile = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id).populate({
			path: 'profile',
			populate: {
				path: 'likes',
				model: 'BeerPost',
				populate: {
					path: 'brewery',
					model: 'Brewery',
				},
			},
		});

		const { profile, username, dateOfBirth, firstName, lastName, createdAt } = user;
		const status = 200;

		const payload = { username, firstName, lastName, ...profile, dateOfBirth, createdAt };
		res.json(
			new SuccessResponse(
				`Viewing ${user.username}'s profile.`,
				status,
				payload,
				req.didTokenRegenerate ? req.accessToken : undefined
			)
		);
	} catch (error) {
		next(error);
	}
};

export default viewProfile;
