import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
	url: String,
	filename: String,
	uploadedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});
const Image = mongoose.model('Image', imageSchema);

export default Image;
