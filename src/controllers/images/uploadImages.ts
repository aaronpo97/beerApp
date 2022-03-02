import Image from '../../database/models/Image';
import ServerError from '../../utilities/errors/ServerError';
import { SuccessResponse } from '../../utilities/response/SuccessResponse';

import { Request, Response, NextFunction } from 'express';

const uploadImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files.length) throw new ServerError('No files were given to the uploader.', 400);

    const images = [];
    (req.files as Express.Multer.File[]).forEach(async (file) => {
      const imageToUpload = new Image({
        filename: file.filename,
        url: file.path,
        uploadedBy: req.currentUser,
      });
      images.push(imageToUpload);
      await imageToUpload.save();
    });

    const status = 201;

    const fileCount = req.files.length;

    next(
      new SuccessResponse(
        `Uploaded ${fileCount} image${fileCount > 1 ? 's' : ''}`,
        status,
        images,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default uploadImages;
