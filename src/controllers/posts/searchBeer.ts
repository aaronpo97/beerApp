import { NextFunction, Request, Response } from 'express';
import BeerPost from '../../database/models/BeerPost';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const search = async (query: string) => {
  const searchCriteria = new RegExp(query, 'ig');

  const searchResults = await BeerPost.find(
    { name: searchCriteria },
    'name type description abv ibu brewery likedBy',
  )
    .populate('images', 'url')
    .populate('brewery', 'name');

  return searchResults;
};

const searchBeer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { query } = req;

    const payload = query.name ? await search(query.name as string) : [];
    const message = `Searching by type: ${query.type}. Returned ${payload.length} result${
      payload.length !== 1 ? 's' : ''
    }.`;
    next(new SuccessResponse(message, 200, payload, req.didTokenRegenerate ? req.newAccessToken : undefined));
  } catch (error) {
    next(error);
  }
};
export default searchBeer;
