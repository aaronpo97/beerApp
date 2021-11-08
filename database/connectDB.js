import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default MONGO_DB => {
	mongoose
		.connect(MONGO_DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to MongoDB.'))
		.catch(error => console.log(error));
};
