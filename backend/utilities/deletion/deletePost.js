import Brewery from '../../database/models/Brewery.js';
import User from '../../database/models/User.js';

const deletePost = async (post) => {
  try {
    await Brewery.findByIdAndUpdate(post.brewery.toString(), { $pull: { beers: post._id } });
    await User.findByIdAndUpdate(post.postedBy.toString(), { $pull: { posts: post._id } });
    return await post.delete();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default deletePost;
