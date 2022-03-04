import ServerError from '../errors/ServerError';
import { ascendingSort, descendingSort } from './sortingFunctions';

const sort = (arr: any[], method: 'ascending' | 'descending', param: string): any[] => {
  if (method && !param) throw new ServerError('Undefined parameter for sorting function at GET /beers', 400);

  switch (method) {
    case 'ascending':
      return ascendingSort(arr, param);
    case 'descending':
      return descendingSort(arr, param);
    default:
      return arr;
  }
};

export default sort;
