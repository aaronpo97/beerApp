import Brewery from '../../database/models/Brewery';
import User from '../../database/models/User';
import deleteComment from './deleteComment';

const deletePost = async (post) => {
  try {
    await Brewery.findByIdAndUpdate(post.brewery.toString(), { $pull: { beers: post._id } });
    await User.findByIdAndUpdate(post.postedBy.toString(), { $pull: { posts: post._id } });

    post.comments.forEach(async (comment) => deleteComment(comment));
    return await post.deleteOne();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default deletePost;
