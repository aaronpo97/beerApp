import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default MONGO_DB_URI => {
	mongoose
		.connect(MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to MongoDB.'))
		.catch(error => console.log(error));
};
