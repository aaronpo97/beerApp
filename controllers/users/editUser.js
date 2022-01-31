import User from '../../database/models/User.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const editUser = async (req, res, next) => {
  try {
    const userUpdates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.queriedUser._id, userUpdates);

    const status = 200;

    const message = `Successfully edited user: ${updatedUser._id}`;
    const payload = updatedUser.populate('BeerPost');

    res.json(
      new SuccessResponse(
        message,
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default editUser;
