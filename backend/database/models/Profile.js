import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
	about: String,
	occupation: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	affiliation: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Brewery',
	},
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
