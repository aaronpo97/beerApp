import { createRequire } from 'module';
import dotenv from 'dotenv';
import connectDB from './database/connectDB.js';
import BeerPost from './database/models/BeerPost.js';
import User from './database/models/User.js';

dotenv.config();
const { MONGO_DB_URI } = process.env;
const require = createRequire(import.meta.url);
const data = require('./sampleData.json');

const seedDB = async () => {
	await connectDB(MONGO_DB_URI);
	await User.deleteMany({});
	await BeerPost.deleteMany({});

	for (const dataElement of data) {
		const post = new BeerPost(dataElement);
		await post.save();
	}

	const email = 'admin@beerapp.com';
	const username = 'admin';
	const password = 'password';

	const createUser = new User({ email, username });
	await User.register(createUser, password);
};

export default seedDB;
