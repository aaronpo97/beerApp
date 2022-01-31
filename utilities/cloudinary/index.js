/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import dotenv from 'dotenv';

dotenv.config();

const {
  CLOUDINARY_CLOUD_NAME: cloud_name,
  CLOUDINARY_KEY: api_key,
  CLOUDINARY_SECRET: api_secret,
} = process.env;

cloudinary.config({ cloud_name, api_key, api_secret });

const storage = new CloudinaryStorage({ cloudinary, params: { folder: 'BeerApp' } });

const config = { cloudinary, storage };

export default config;
