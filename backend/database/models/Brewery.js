import mongoose from 'mongoose';

const brewerySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	location: {
		type: String,
		required: true,
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
});

const Brewery = mongoose.model('Brewery', brewerySchema);

export default Brewery;
