import mongoose from 'mongoose';
const { Schema } = mongoose;

const BeerSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: String },
	brewery: { type: String, required: true },
	location: { type: String, required: true },
	image: { type: String },
	abv: { type: Number },
	ibu: { type: Number },
});

const BeerPost = mongoose.model('BeerPost', BeerSchema);
export default BeerPost;
