import { Request, Response, NextFunction } from 'express';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const sendVerifiedUserResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { currentUser } = req;

  const payload = await currentUser.populate({
    path: 'profile',
    populate: { path: 'displayImage', model: 'Image' },
  });

  next(
    new SuccessResponse(
      `Successfully verified ${req.currentUser.username}.`,
      200,
      payload,
      req.didTokenRegenerate ? req.accessToken : undefined,
    ),
  );
};

export default sendVerifiedUserResponse;
