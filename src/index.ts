import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import process from 'process';
import passport from 'passport';
import PassportLocal from 'passport-local';

import ServerError from './utilities/errors/ServerError';

import { SuccessResponse } from './utilities/response/SuccessResponse';
import { ErrorResponse } from './utilities/response/ErrorResponse';
import connectDB from './database/connectDB';
import User from './database/models/User';

import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';
import commentRoutes from './routes/commentRoutes';
import imageRoutes from './routes/imageRoutes';
import userRoutes from './routes/userRoutes';

const { PORT = '4000', MONGO_DB_URI = '', BASE_URL = '', NODE_ENV = 'development' } = process.env;
const inProductionMode: boolean = NODE_ENV === 'production';

if (!inProductionMode) {
  dotenv.config();
}

// eslint-disable-next-line no-undef

const app = express();

const initializeDB = async () => {
  await connectDB(MONGO_DB_URI);
  console.clear();
  console.log(`The Biergarten API\n\n${'Connected to MongoDB.'}`);
};

if (!inProductionMode) {
  app.use(cors());
}

// To parse the incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());

// @ts-expect-error
passport.use(new PassportLocal.Strategy(User.authenticate()));
// @ts-expect-error
passport.serializeUser(User.serializeUser());
// @ts-expect-error
passport.deserializeUser(User.deserializeUser());

if (inProductionMode) {
  app.use(express.static(path.join(__dirname, './client/build/')));
}

app.all('api/teapot', () => {
  throw new ServerError("I'm a teapot!", 418);
});

// Express router:
app.use('/api/beers', beerRoutes);
app.use('/api/beers/:id/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/breweries', breweryRoutes);
app.use('/api/images', imageRoutes);

// Response handling:
app.use((data: SuccessResponse, req: Request, res: Response, next: NextFunction) => {
  const { status, success } = data;
  if (success) {
    res.status(status).json(data);
  } else {
    next(data);
  }
});

// Error handling:

// eslint-disable-next-line no-unused-vars
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const { status = 500, message = 'Oh no, something went wrong.', stack } = err;
  res.status(status).json(new ErrorResponse(message, status, !inProductionMode ? stack : undefined));
});

// Serving compiled react app from ../frontend/build
if (inProductionMode) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}

app.listen(PORT || 3000, () => {
  console.clear();
  console.log('Loading the Biergarten API...');
  initializeDB().then(() => console.log(`Connected to ${BASE_URL}`));
});
