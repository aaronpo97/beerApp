import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword = '', newPassword = '' } = req.body;

    const { currentUser } = req;
    await currentUser.changePassword(currentPassword, newPassword);
    next(new SuccessResponse('Successfully changed password.', 200));
  } catch (error) {
    if (error.name === 'MissingPasswordError') {
      next(new ServerError(`Password was not provided.`, 400));
    }
    if (error.name === 'IncorrectPasswordError') {
      next(new ServerError(`Password is incorrect.`, 401));
    }
    next(new ServerError(error));
  }
};

export default changePassword;
