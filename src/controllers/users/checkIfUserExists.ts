import ServerError from '../../utilities/errors/ServerError';
import { Request, Response, NextFunction } from 'express';
import SuccessResponse from '../../utilities/response/SuccessResponse';
import User from '../../database/models/User';

const doesUserExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username = '', email = '' } = req.query;

    if (!(username || email))
      throw new ServerError('Missing necessary query parameters for GET /doesUserExist', 400);
    const doesUsernameExist = await User.findOne({ username });
    const doesEmailExist = await User.findOne({ email });

    const payload = {
      usernameExists: username ? !!doesUsernameExist : undefined,
      emailExists: email ? !!doesEmailExist : undefined,
    };

    const message = `Performed query on accounts with the given parameters: (${email && `email: ${email}`}${
      email && username && ' OR'
    } ${username && `username: ${username}`})`;

    next(new SuccessResponse(message, 200, payload, undefined));
  } catch (error) {
    next(error);
  }
};

export default doesUserExist;
