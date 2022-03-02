import { Schema, model, ObjectId } from 'mongoose';

interface Image {
  url: string;
  filename: string;
  uploadedBy: ObjectId;
  createdTimestamp: Date;
}

const imageSchema = new Schema<Image>({
  url: String,
  filename: String,
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdTimestamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export default model('Image', imageSchema);
