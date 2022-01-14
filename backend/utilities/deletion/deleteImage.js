import config from '../../utilities/cloudinary/index.js';
const { cloudinary } = config;

const deleteImage = async image => {
	try {
		await cloudinary.uploader.destroy(image.filename);
		await image.delete();
	} catch (error) {
		return Promise.reject(error);
	}
};

export default deleteImage;
