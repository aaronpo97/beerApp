import User from '../../database/models/User.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const editUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.queriedUser._id, {
      firstName,
      lastName,
      email,
      username,
    });

    const status = 200;
    const message = `Successfully edited user: ${updatedUser._id}`;

    res.json(
      new SuccessResponse(
        message,
        status,
        undefined,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default editUser;
