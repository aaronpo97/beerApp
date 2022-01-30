import ServerError from '../utilities/errors/ServerError.js';

const isAccountNotConfirmed = (req, res, next) => {
  if (req.currentUser.isAccountConfirmed) {
    throw new ServerError(
      'Your account is already confirmed. Please change your email through PUT edit user',
      403,
    );
  }

  next();
};

export default isAccountNotConfirmed;
