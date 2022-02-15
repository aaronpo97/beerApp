import BeerPost from '../../database/models/BeerPost.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

import Comment from '../../database/models/Comment.js';

const postComment = async (req, res, next) => {
  try {
    const { commentBody, commentRating } = req.body;

    const { currentUser } = req;

    const beerPost = await BeerPost.findById(req.params.id);

    const comment = new Comment({
      body: commentBody,
      rating: commentRating,
      author: currentUser,
      post: beerPost,
      timestamp: Date.now(),
    });
    if (!beerPost) throw new Error('Beer post not found.');
    beerPost.comments.push(comment);
    currentUser.comments.push(comment);

    await comment.save();
    await beerPost.save();
    await currentUser.save();

    const postedComment = await Comment.findById(comment._id)
      .populate('author', 'username')
      .populate('post', 'name');

    next(
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
