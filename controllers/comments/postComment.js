import BeerPost from '../../database/models/BeerPost.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

import Comment from '../../database/models/Comment.js';

const postComment = async (req, res, next) => {
  try {
    const { comment: body } = req.body;

    const { currentUser: author } = req;

    const beerPost = await BeerPost.findById(req.params.id);

    const comment = new Comment({ body, author, post: beerPost, timestamp: Date.now() });
    await comment.save();
    if (!beerPost) throw new Error('notfound');
    beerPost.comments.push(comment);
    await beerPost.save();

    // eslint-disable-next-line no-underscore-dangle
    const postedComment = await Comment.findById(comment._id)
      .populate('author', 'username')
      .populate('post', 'name');

    res
      .status(201)
      .json(
        new SuccessResponse(
          `Posted a comment on ${beerPost.name}.`,
          201,
          postedComment,
          req.newAccessToken ? req.newAccessToken : undefined,
        ),
      );
  } catch (error) {
    next(error);
  }
};

export default postComment;
