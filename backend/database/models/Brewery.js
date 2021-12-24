import mongoose from 'mongoose';

const brewerySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	location: {
		address: { type: String, required: true },
		coordinates: [
			{ type: Number, required: true },
			{ type: Number, required: true },
		],
	},

	beers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'BeerPost',
		},
	],
	associatedProfiles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile',
		},
	],
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	description: { type: String, required: true },
});

const Brewery = mongoose.model('Brewery', brewerySchema);

export default Brewery;
