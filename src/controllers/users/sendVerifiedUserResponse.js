import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const sendVerifiedUserResponse = async (req, res, next) => {
  const { currentUser } = req;

  const payload = await currentUser.populate({
    path: 'profile',
    populate: { path: 'displayImage', model: 'Image' },
  });
  next(
    new SuccessResponse(
      `Successfully verified ${req.currentUser.username}.`,
      200,
      payload,
      req.didTokenRegenerate ? req.accessToken : undefined,
    ),
  );
};

export default sendVerifiedUserResponse;
