import User from '../../database/models/User.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const changeName = async (req, res, next) => {
  try {
    const { currentUser } = req;
    const { firstName, lastName } = req.body;

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;

    await currentUser.save();

    const updatedUser = await User.findById(currentUser._id);

    next(
      new SuccessResponse(
        `Updated the first/last name for ${updatedUser.username}`,
        200,
        updatedUser,
        req.newAccessToken ?? undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default changeName;
