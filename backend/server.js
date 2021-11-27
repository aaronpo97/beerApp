import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import passport from 'passport';
import PassportLocal from 'passport-local';

import connectDB from './database/connectDB.js';
import beerRoutes from './routes/beerRoutes.js';
import authRoutes from './routes/authRoutes.js';

import seed from './seed.js';
import User from './database/models/User.js';

dotenv.config();

const { PORT, MONGO_DB_URI } = process.env;

const app = express();

const initializeDB = async () => {
	await seed();
	await connectDB(MONGO_DB_URI);
	console.log('Connected to MongoDB.');
};

initializeDB();

app.use(cors());
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal.Strategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//using express router
app.use('', authRoutes);
app.use('/beer', beerRoutes);

app.use((err, req, res, next) => {
	const { status = 500, stack = '', message = 'Oh no, something went wrong.' } = err;
	res.status(status).json({ message, status, success: false, stack });
});

app.listen(PORT, () => {
	console.log(`Connected to http://localhost:${PORT}`);
});
