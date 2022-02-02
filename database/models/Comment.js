import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: { type: mongoose.Schema.Types.String, required: true },
  timestamp: { type: mongoose.Schema.Types.Date, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost', required: true },
  rating: { type: mongoose.Schema.Types.Number, max: 5, min: 1, required: true },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
