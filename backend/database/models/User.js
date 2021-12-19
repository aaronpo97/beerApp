import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const calculateMinAge = () => Date.now() - 599_594_400_000;

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	accountConfirmed: {
		type: Boolean,
		required: true,
		default: false,
	},
	dateOfBirth: {
		type: Date,
		required: true,
		max: calculateMinAge(),
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	profile: {
		occupation: { type: String },
		about: { type: String },
		affiliation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Brewery',
		},
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'BeerPost',
		},
	],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
