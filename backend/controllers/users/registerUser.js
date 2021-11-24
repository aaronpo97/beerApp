import bcrypt from 'bcrypt';
import User from '../../database/models/User.js';

const registerUser = async (req, res) => {
	const userToRegister = req.body;

	const { username, email, password: unencryptedPassword } = userToRegister;

	const isUsernameTaken = await User.findOne({ username });
	const isEmailTaken = await User.findOne({ email });

	if (isUsernameTaken || isEmailTaken) return res.json({ message: 'Username or email already taken.' });

	const password = await bcrypt.hash(unencryptedPassword, 10);
	const newUser = new User({ username, email, password });
	await newUser.save();

	console.log(newUser);
	res.json({ message: 'success' });
};

export default registerUser;
