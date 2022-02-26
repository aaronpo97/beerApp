import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import ms from 'ms';

const userSchema = mongoose.Schema({
  isAccountConfirmed: { type: Boolean, required: true, default: false },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true, max: Date.now() - ms('19 years') },
  createdAt: { type: Date, default: Date.now(), required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  profile: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' }],
    affiliation: { type: mongoose.Schema.Types.ObjectId, ref: 'Brewery' },
    displayImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    currentCity: { type: String },
    bio: { type: String },
    gender: { type: String },
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

export default User;
