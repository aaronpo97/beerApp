import { createRequire } from 'module';
import dotenv from 'dotenv';
import connectDB from './database/connectDB.js';
import BeerPost from './database/models/BeerPost.js';
import User from './database/models/User.js';
import Profile from './database/models/Profile.js';
import Brewery from './database/models/Brewery.js';
dotenv.config();
const { MONGO_DB_URI } = process.env;
const require = createRequire(import.meta.url);
const data = require('./sampleData.json');

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

	const newUser = new User({
		email: 'user@beerapp.com',
		username: 'users',
		accountConfirmed: true,
		profile,
		dateOfBirth: '2000-04-20',
	});

	brewery.associatedProfiles.push(profile);

	profile.user = newUser;

	const beer = new BeerPost({
		name: 'Lorem Porter',
		type: 'Porter',
		description: 'Lorem ipsum dolor sit amet.',
		image: 'somesite.net',
		abv: 8,
		ibu: 35,
		brewery,
	});

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
			author: newUser,
		});
		await post.save();
		brewery.beers.push(post);
		newUser.posts.push(post);
	}

	await brewery.save();
	await beer.save();
	await profile.save();
	await User.register(newUser, 'password');
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
