import { createRequire } from 'module';
import dotenv from 'dotenv';

dotenv.config();
import connectDB from './database/connectDB.js';

import BeerPost from './database/models/BeerPost.js';

const { MONGO_DB_URI } = process.env;
const require = createRequire(import.meta.url);
const data = require('./sampleData.json');

connectDB(MONGO_DB_URI);

for (const dataElement of data) {
	const seedDB = async () => {
		const post = new BeerPost(dataElement);
		console.log(dataElement);
		await post.save();
	};
}
