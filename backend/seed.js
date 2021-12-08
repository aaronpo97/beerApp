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

	const createAdminUser = new User({ email: 'admin@beerapp.com', username: 'admin', accountConfirmed: true });
	const createRegularUser = new User({ email: 'user@beerapp.com', username: 'user', accountConfirmed: true });

	await User.register(createAdminUser, 'password');
	await User.register(createRegularUser, 'password');
};

seedDB().then(() => {
	console.log('\nDevelopment database cleared and repopulated.');
	console.log('Goodbye.\n');

	process.exit(0);
});
