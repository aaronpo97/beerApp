import { Schema, ObjectId, model } from 'mongoose';

interface Comment {
  body: string;
  timestamp: Date;
  author: ObjectId;
  post: ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
}

const CommentSchema = new Schema<Comment>({
  body: { type: Schema.Types.String, required: true },
  timestamp: { type: Schema.Types.Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'BeerPost', required: true },
  rating: { type: Schema.Types.Number, max: 5, min: 1, required: true },
});

export default model('Comment', CommentSchema);
