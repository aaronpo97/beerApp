import dotenv from 'dotenv';
import { createRequire } from 'module';
import colors from 'colors';
import connectDB from '../database/connectDB.js';
import BeerPost from '../database/models/BeerPost.js';
import User from '../database/models/User.js';

import Brewery from '../database/models/Brewery.js';

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

	const profile = {
		about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in facilisis libero, eget congue lorem.',
		occupation: 'Apprentice Brewer',
		affiliation: brewery,
	};

	const user = new User({
		profile,
		email: 'user@beerapp.com',
		username: 'user',
		accountConfirmed: true,
		dateOfBirth: '2000-04-20',
	});

	await User.register(user, 'password');
	brewery.associatedProfiles.push(user);

	for (const dataElement of data) {
		const { name, type, description, abv, ibu } = dataElement;
		const post = new BeerPost({
			name,
			type,
			description,
			abv,
			ibu,
			brewery,
			images: [],
			author: user,
		});

		await post.save();
		brewery.beers.push(post);
		user.posts.push(post);
	}

	await brewery.save();
	await user.save();
};

const seedDB = async () => {
	await connectDB(MONGO_DB_URI);
	await User.deleteMany({});
	await BeerPost.deleteMany({});
	await Brewery.deleteMany({});

	await postData();
};

seedDB().then(() => {
	console.log('\nDevelopment database cleared and repopulated.\n'.blue);
	process.exit(0);
});
