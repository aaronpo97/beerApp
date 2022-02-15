import BeerPost from '../../database/models/BeerPost.js';
import Comment from '../../database/models/Comment.js';

import sorter from '../../utilities/data/sorter.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const paginate = (array, pageNumber, pageSize) =>
  array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

const viewPostComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = '1', size = '5', sortingDirection = 'descending', sortingParam = 'timestamp' } = req.query;

    const comments = await Comment.find({ post: id }).populate('author', 'username');
    const post = await BeerPost.findById(id);

    const sortedComments = sorter(comments, sortingDirection, sortingParam);
    const paginatedComments = paginate(sortedComments, page, size);

    const pageCount = Math.ceil(sortedComments.length / size);

    next(
      new SuccessResponse(
        `Sending page ${page} of ${pageCount} of comments for ${post.name}.`,
        200,
        { paginatedComments, pageCount },
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default viewPostComments;
