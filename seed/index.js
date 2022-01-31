import dotenv from 'dotenv';

import connectDB from '../database/connectDB.js';
import BeerPost from '../database/models/BeerPost.js';
import User from '../database/models/User.js';
import Brewery from '../database/models/Brewery.js';
import Image from '../database/models/Image.js';

import { generateBeerPosts, generateFakeUsers, createAdminUser } from './fakeDataGenerators.js';

dotenv.config();
const { MONGO_DB_URI } = process.env;

const seedDB = async () => {
  await connectDB(MONGO_DB_URI);
  await User.deleteMany({});
  await BeerPost.deleteMany({});
  await Brewery.deleteMany({});
  await Image.deleteMany({});

  const adminUser = await createAdminUser();
  await generateBeerPosts(adminUser);
  await generateFakeUsers();
};

console.clear();

console.log('Seeding database...');

seedDB().then(() => {
  console.log('\nDevelopment database cleared and repopulated.\n');
  process.exit(0);
});
