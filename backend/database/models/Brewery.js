import mongoose from 'mongoose';

const brewerySchema = mongoose.Schema({
	name: { type: String, required: true },
	beers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' }],
	associatedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
	images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
	headerImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
	postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	description: { type: String, required: true },
	location: {
		place_name: { type: String, required: true },
		geometry: {
			type: { type: String, enum: ['Point'], required: true },
			coordinates: { type: [Number], required: true },
		},
	},
});

const Brewery = mongoose.model('Brewery', brewerySchema);

export default Brewery;
