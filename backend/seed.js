import dotenv from 'dotenv';
import { createRequire } from 'module';

import connectDB from './database/connectDB.js';
import BeerPost from './database/models/BeerPost.js';
import User from './database/models/User.js';
import Profile from './database/models/Profile.js';
import Brewery from './database/models/Brewery.js';

const require = createRequire(import.meta.url);
const data = require('./sampleData.json');

dotenv.config();
const { MONGO_DB_URI } = process.env;

const postData = async () => {
	const brewery = new Brewery({
		name: 'Lorem Ipsum Brewing Company',
		location: 'Null Island',
		beers: [],
		associatedProfiles: [],
	});

	const profile = new Profile({
		about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in facilisis libero, eget congue lorem.',
		occupation: 'Apprentice Brewer',
		affiliation: brewery,
	});

	const user = new User({
		email: 'user@beerapp.com',
		username: 'users',
		accountConfirmed: true,
		profile,
		dateOfBirth: '2000-04-20',
	});

	await User.register(user, 'password');
	brewery.associatedProfiles.push(profile);

	profile.user = user;

	for (const dataElement of data) {
		const { name, type, description, image, abv, ibu } = dataElement;
		const post = new BeerPost({
			name,
			type,
			description,
			image,
			abv,
			ibu,
			brewery,
			author: user,
		});

		await post.save();
		brewery.beers.push(post);
		user.posts.push(post);
	}

	await brewery.save();
	await profile.save();
	await user.save();
};

const seedDB = async () => {
	await connectDB(MONGO_DB_URI);
	await User.deleteMany({});
	await BeerPost.deleteMany({});
	await Profile.deleteMany({});
	await Brewery.deleteMany({});

	await postData();
};

seedDB().then(() => {
	console.log('\nDevelopment database cleared and repopulated.');

	process.exit(0);
});
