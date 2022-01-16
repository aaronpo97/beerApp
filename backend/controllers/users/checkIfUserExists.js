import ServerError from '../../utilities/errors/ServerError.js';
import { SuccessResponse } from '../../utilities/response/responses.js';
import User from '../../database/models/User.js';

const doesUserExist = async (req, res, next) => {
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

    res.json(new SuccessResponse(message, 200, payload, undefined));
  } catch (error) {
    next(error);
  }
};

export default doesUserExist;
