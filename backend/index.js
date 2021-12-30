import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import PassportLocal from 'passport-local';
import ServerError from './utilities/errors/ServerError.js';

import connectDB from './database/connectDB.js';
import User from './database/models/User.js';

import beerRoutes from './routes/beerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import breweryRoutes from './routes/breweryRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const { PORT, MONGO_DB_URI } = process.env;

const app = express();

const initializeDB = async () => {
	await connectDB(MONGO_DB_URI);
	console.log('Connected to MongoDB.');
};

// Enable cross origin resource sharing (dev only)
app.use(cors());

// To parse the incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport.js
app.use(passport.initialize());
passport.use(new PassportLocal.Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.all('/teapot', (req, res, next) => {
	throw new ServerError(`I'm a teapot!`, 418);
});

// Express router:
app.use('', authRoutes);
app.use('/beer', beerRoutes);
app.use('/user', userRoutes);
app.use('/breweries', breweryRoutes);
app.use('/images', imageRoutes);

// Error handling:
app.use((err, req, res, next) => {
	const { stack, status = 500, message = 'Oh no, something went wrong.' } = err;
	res.status(status).json({ message, status, stack });
});

app.listen(PORT, () => {
	initializeDB();
	console.log(`Connected to http://localhost:${PORT}`);
});
