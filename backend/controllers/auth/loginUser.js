const loginUser = (req, res, next) => {
	try {
		res.json({ message: 'success' });
	} catch (err) {
		next(err.message + err.stack);
	}
};

export default loginUser;
