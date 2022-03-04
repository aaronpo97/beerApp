import { Request, Response, NextFunction } from 'express';

import Image from '../../database/models/Image';
import ServerError from '../../utilities/errors/ServerError';
import imageDeleter from '../../utilities/deletion/deleteImage';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const imageToDelete = await Image.findById(id);

    if (!imageToDelete)
      throw new ServerError(`Cannot delete an image with the id of ${id} as it does not exist.`, 404);

    await imageDeleter(imageToDelete);

    const status = 200;

    const payload = {
      image: imageToDelete,
      deleted: true,
    };
    next(
      new SuccessResponse(
        `Image ${imageToDelete._id} successfully deleted.`,
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};
export default deleteImage;
