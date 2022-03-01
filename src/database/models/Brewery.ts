import mongoose, { Schema, model, Types } from 'mongoose';

interface Brewery {
  name: string;
  beers: Types.ObjectId[];
  associatedProfiles: Types.ObjectId[];
  images: Types.ObjectId[];
  postedBy: Types.ObjectId;
  description: string;
  location: {
    place_name: string;
    geometry: {
      coordinates: number[];
    };
  };
}
const brewerySchema = new Schema<Brewery>({
  name: { type: String, required: true },
  beers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' }],
  associatedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  location: {
    place_name: { type: String },
    geometry: {
      type: { type: String, enum: ['Point'] },
      coordinates: { type: [Number] },
    },
  },
  createdTimestamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export default model('Brewery', brewerySchema);
