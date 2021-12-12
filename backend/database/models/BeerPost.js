import mongoose from 'mongoose';
const { Schema } = mongoose;

const BeerSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: String },
	brewery: { type: mongoose.Schema.Types.ObjectId, ref: 'Brewery' },
	image: { type: String },
	abv: { type: Number },
	ibu: { type: Number },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const BeerPost = mongoose.model('BeerPost', BeerSchema);
export default BeerPost;
