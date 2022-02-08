import dotenv from 'dotenv';
import ms from 'ms';
import process from 'process';

import BeerPost from '../database/models/BeerPost.js';
import Brewery from '../database/models/Brewery.js';
import connectDB from '../database/connectDB.js';
import Image from '../database/models/Image.js';
import User from '../database/models/User.js';

import {
  generateBeerPosts,
  generateFakeUsers,
  createAdminUser,
} from './fakeDataGenerators.js';
import Comment from '../database/models/Comment.js';

dotenv.config();
const { MONGO_DB_URI } = process.env;

const seedDB = async () => {
  await connectDB(MONGO_DB_URI);
  await User.deleteMany({});
  await BeerPost.deleteMany({});
  await Brewery.deleteMany({});
  await Image.deleteMany({});
  await Comment.deleteMany({});

  const adminUser = await createAdminUser();
  await generateBeerPosts(adminUser);
  await generateFakeUsers();
};

console.clear();

console.log('Seeding database...');

const startTime = performance.now();

seedDB().then(() => {
  const endTime = performance.now();

  console.log(`\nDatabase population took ${ms(endTime - startTime)}.`);
  console.log('\nDevelopment database cleared and repopulated.\n');

  setTimeout(() => process.exit(0), 5000);
});
