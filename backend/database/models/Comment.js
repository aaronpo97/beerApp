import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema({
   body: { type: mongoose.Schema.Types.String },
   timestamp: { type: mongoose.Schema.Types.Date, default: Date.now() },
   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   post: { type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
