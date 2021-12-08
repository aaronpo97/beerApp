import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

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
	},
	profile: {
		about: { type: String },
		occupation: { type: String },
		brewingExperience: { type: String },
	},
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
