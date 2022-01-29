import User from '../database/models/User.js';
import ServerError from '../utilities/errors/ServerError.js';

const changeEmail = (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const userAccount = User.findById(id);
    if (!userAccount) throw new ServerError('Cannot find a user with that id. ');

    userAccount.updateOne({ email });

    res.send(`Changing email address for user ${id} to ${email}`);
  } catch (error) {
    next(error);
  }
};

export default changeEmail;
