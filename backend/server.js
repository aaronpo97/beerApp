import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import connectDB from './database/connectDB.js';
import BeerRoutes from './routes/BeerRoutes.js';
import LoginRoute from './routes/Login.js';
import RegisterRoute from './routes/Register.js';

dotenv.config();
const { PORT, MONGO_DB_URI } = process.env;

const app = express();

connectDB(MONGO_DB_URI);

app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//using express router
app.use('/beer', BeerRoutes);
app.use('/login', LoginRoute);
app.use('/register', RegisterRoute);

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong!';
	res.status(status).send(`${err}`);
});

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
