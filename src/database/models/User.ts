import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import ms from 'ms';

const userSchema = new Schema({
  isAccountConfirmed: { type: Boolean, required: true, default: false },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true, max: Date.now() - ms('19 years') },
  createdAt: { type: Date, default: Date.now(), required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'BeerPost' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  profile: {
    likes: [{ type: Schema.Types.ObjectId, ref: 'BeerPost' }],
    affiliation: { type: Schema.Types.ObjectId, ref: 'Brewery' },
    displayImage: { type: Schema.Types.ObjectId, ref: 'Image' },
    currentCity: { type: String },
    bio: { type: String },
    gender: { type: String },
  },
});

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

export default User;
