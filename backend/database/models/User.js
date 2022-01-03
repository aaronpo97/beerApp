import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
	isAccountConfirmed: { type: Boolean, required: true, default: false },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	dateOfBirth: {
		type: Date,
		required: true,
		max: Date.now() - 599_594_400_000, //current day in unix time subtracted by 19 years in unix
	},
	createdAt: { type: Date, default: Date.now(), required: true },
	profile: {
		occupation: { type: String },
		about: { type: String },
		affiliation: { type: mongoose.Schema.Types.ObjectId, ref: 'Brewery' },
	},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' }],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
