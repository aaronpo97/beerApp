import mongoose, { Schema, model, Types, Document } from 'mongoose';

export interface BeerInterface extends Document {
  name: string;
  type: string;
  description: string;
  images: Types.ObjectId[];
  abv: number;
  ibu: number;
  brewery: Types.ObjectId;
  postedBy: Types.ObjectId;
  createdTimestamp: Date;
  likedBy: Types.ObjectId[];
  comments: Types.ObjectId[];
}

const BeerSchema = new Schema<BeerInterface>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  abv: { type: Number },
  ibu: { type: Number },
  brewery: { type: mongoose.Schema.Types.ObjectId, ref: 'Brewery', required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdTimestamp: { type: Date, default: Date.now(), required: true },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

export default model<BeerInterface>('BeerPost', BeerSchema);
