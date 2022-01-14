const isAccountConfirmed = (req, res, next) => {
	if (!req.currentUser.isAccountConfirmed)
		throw new ServerError('Your account is not confirmed. Please confirm your account.', 403);
	next();
};

export default isAccountConfirmed;
