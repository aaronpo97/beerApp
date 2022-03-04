import BeerPost from '../../database/models/BeerPost';
import Comment from '../../database/models/Comment';

import sorter from '../../utilities/data/sorter';

import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import SuccessResponse from '../../utilities/response/SuccessResponse';

interface PostCommentsInterface {
  _id: ObjectId;
  body: string;
  timestamp: Date;
  author: {
    _id: ObjectId;
    username: string;
  };
  post: ObjectId;
  rating: number;
  __v: number;
}

const paginateComments = (array: PostCommentsInterface[], pageNum: number, pageSize: number) =>
  array.slice((pageNum - 1) * pageSize, pageNum * pageSize);

const viewPostComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { page = '1', size = '5', sortingDirection = 'descending', sortingParam = 'timestamp' } = req.query;

    const comments = await Comment.find({ post: id }).populate('author', 'username');
    const post = await BeerPost.findById(id);

    const sortedComments = sorter(
      comments,
      sortingDirection as 'ascending' | 'descending',
      sortingParam as string,
    );
    const paginatedComments = paginateComments(
      sortedComments,
      parseInt(page as string),
      parseInt(size as string),
    );

    const pageCount = Math.ceil(sortedComments.length / parseInt(page as string));

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
