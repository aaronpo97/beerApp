import mongoose from 'mongoose';

const { Schema } = mongoose;

const BeerSchema = new Schema({
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

const BeerPost = mongoose.model('BeerPost', BeerSchema);
export default BeerPost;
