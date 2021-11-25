import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
