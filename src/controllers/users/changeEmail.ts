import User from '../../database/models/User';
import ServerError from '../../utilities/errors/ServerError';
import { SuccessResponse } from '../../utilities/response/SuccessResponse';

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidEmail = (email) => emailRegex.test(email);

const changeEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!isValidEmail(email)) throw new ServerError('That email is invalid.', 400);

    const userAccount = await User.findByIdAndUpdate(id, { email });
    if (!userAccount) throw new ServerError('Cannot find a user with that id.', 404);
    await userAccount.save();

    next(
      new SuccessResponse(
        `Changed email for ${userAccount.username} to ${email}.`,
        200,
        { email },
        req.newAccessToken ? req.newAccessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default changeEmail;
