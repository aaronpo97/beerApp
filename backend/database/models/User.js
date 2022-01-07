import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import ms from 'ms';

const userSchema = mongoose.Schema({
	isAccountConfirmed: { type: Boolean, required: true, default: false },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	dateOfBirth: {
		type: Date,
		required: true,
		max: Date.now() - ms('19 years'),
	},
	createdAt: { type: Date, default: Date.now(), required: true },
	profile: {
		occupation: { type: String },
		about: { type: String },
		affiliation: { type: mongoose.Schema.Types.ObjectId, ref: 'Brewery' },
	},
	firstName: { type: String },
	lastName: { type: String },
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' }],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
