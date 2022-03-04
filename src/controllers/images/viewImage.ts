import { Request, Response, NextFunction } from 'express';

import Image from '../../database/models/Image';
import ServerError from '../../utilities/errors/ServerError';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const viewImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) throw new ServerError(`Cannot find an image with the id of '${id}'.`, 404);
    const status = 200;
    next(
      new SuccessResponse(
        `Sending image: ${image.filename}`,
        status,
        image,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ServerError(`Cannot find an image with the id of '${req.params.id}' as it is invalid.`, 404));
    } else {
      next(error);
    }
  }
};
export default viewImage;
