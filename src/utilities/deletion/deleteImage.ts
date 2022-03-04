import config from '../cloudinary/index';

const { cloudinary } = config;

const deleteImage = async (image) => {
  await cloudinary.uploader.destroy(image.filename);
  return await image.delete();
};

export default deleteImage;
