import dotenv from 'dotenv';
import express from 'express';
import connectDB from './database/connectDB.js';
import BeerRoutes from './routes/BeerRoutes.js';

dotenv.config();
const { PORT, MONGO_DB } = process.env;

const app = express();

connectDB(MONGO_DB);

app.use(express.json());

//using express router
app.use('/beer', BeerRoutes);

app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
