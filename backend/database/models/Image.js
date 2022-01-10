import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
	url: String,
	filename: String,
	uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdTimestamp: {
		type: Date,
		default: Date.now(),
		required: true,
	},
});
const Image = mongoose.model('Image', imageSchema);

export default Image;
