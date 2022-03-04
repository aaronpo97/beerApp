import { Request, Response, NextFunction } from 'express';
import ServerError from '../../utilities/errors/ServerError';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword = '', newPassword = '' } = req.body;

    const { currentUser } = req;
    // @ts-ignore
    await currentUser.changePassword(currentPassword, newPassword);
    next(new SuccessResponse('Successfully changed password.', 200, undefined, undefined));
  } catch (error) {
    if (error.name === 'MissingPasswordError') {
      next(new ServerError(`Password was not provided.`, 400));
    }
    if (error.name === 'IncorrectPasswordError') {
      next(new ServerError(`Password is incorrect.`, 401));
    }
    next(new ServerError(error, 400));
  }
};

export default changePassword;
