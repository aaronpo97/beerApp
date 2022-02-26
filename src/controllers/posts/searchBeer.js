import BeerPost from '../../database/models/BeerPost.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const search = async (query) => {
  const searchCriteria = new RegExp(query, 'ig');

  const searchResults = await BeerPost.find(
    { name: searchCriteria },
    'name type description abv ibu brewery likedBy',
  )
    .populate('images', 'url')
    .populate('brewery', 'name');

  return searchResults;
};

const searchBeer = async (req, res, next) => {
  try {
    const { query } = req;
    let payload;
    if (query.name) {
      payload = await search(query.name);
    } else {
      payload = {};
    }

    const message = `Searching by type: ${query.type}. Returned ${payload.length} result${
      payload.length !== 1 ? 's' : ''
    }.`;
    next(new SuccessResponse(message, 200, payload));
  } catch (error) {
    next(error);
  }
};
export default searchBeer;
