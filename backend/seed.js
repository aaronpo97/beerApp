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

	const createAdminUser = new User({
		email: 'admin@beerapp.com',
		username: 'admin',
		accountConfirmed: true,
		profile: { about: 'Lorem' },
	});
	const createRegularUser = new User({
		email: 'user@beerapp.com',
		username: 'user',
		accountConfirmed: true,
		profile: {
			about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in facilisis libero, eget congue lorem. Nulla non ligula eget erat aliquam lacinia a eget felis. Nulla turpis sapien, ultricies sit amet suscipit quis, auctor id risus. Donec pellentesque tellus metus, in eleifend lacus euismod eget. Vestibulum vehicula ut metus id vestibulum. Nam vulputate sapien sit amet tempor efficitur. Donec dictum tellus nec leo fringilla, eu tempor neque posuere. Integer porta, velit quis interdum ultricies, quam enim suscipit eros, quis ornare metus ante vitae est. Sed quis dignissim justo, at ultrices urna. Suspendisse gravida, tortor sed semper tristique, erat metus vulputate augue, quis tempor mi nisi vitae magna. Donec auctor fermentum magna, ut feugiat odio tincidunt sit amet. Donec accumsan lorem mi, ut placerat ex lacinia vel. Nullam ut magna feugiat, ornare nibh vel, tincidunt nisi. Fusce tincidunt malesuada posuere.',
			occupation: 'Brewmaster at Lorem Ipsum Brewing Company',
		},
	});

	await User.register(createAdminUser, 'password');
	await User.register(createRegularUser, 'password');
};

seedDB().then(() => {
	console.log('\nDevelopment database cleared and repopulated.');

	process.exit(0);
});
