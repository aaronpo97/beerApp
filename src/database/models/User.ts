import { Schema, model, ObjectId } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import ms from 'ms';

export interface UserInterface {
  isAccountConfirmed: boolean;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  createdAt: Date;
  posts: ObjectId[];
  comments: ObjectId;
  profile: {
    likes: ObjectId[];
    affiliation: ObjectId;
    displayImage: ObjectId;
    currentCity: string;
    bio: string;
    gender: string;
  };
}
const userSchema = new Schema<UserInterface>({
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

userSchema.plugin(passportLocalMongoose as any);

export default model<UserInterface>('User', userSchema);
