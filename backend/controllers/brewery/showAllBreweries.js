import Brewery from '../../database/models/Brewery.js';
import { boolChecker } from '../../utilities/data/dataUtil.js';
import sort from '../../utilities/data/sorter.js';

import { SuccessResponse } from '../../utilities/response/responses.js';

const showAllBreweries = async (req, res, next) => {
   try {
      const allBreweries = await Brewery.find()
         .populate('beers')
         .populate('postedBy', 'username')
         .populate('headerImage', 'url')
         .populate('images', 'url');

      const message = `Sending brewery index.${
         req.query.sort && req.query.param
            ? ` Sorting by ${req.query.param} in ${req.query.sort} order.`
            : ''
      }`;
      const status = 200;
      const payload = sort(allBreweries, req.query.sort, req.query.param);
      res.json(
         new SuccessResponse(
            message,
            status,
            payload,
            req.didTokenRegenerate ? req.accessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};

export default showAllBreweries;
