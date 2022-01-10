import ServerError from '../errors/ServerError.js';
import { ascendingSort, descendingSort, randomSort } from './sortingFunctions.js';

const sort = (arr, method, param) => {
	if (method && !param) throw new ServerError('Undefined parameter for sorting function at GET /beers', 400);
	switch (method) {
		case 'ascending':
			return ascendingSort(arr, param);
		case 'descending':
			return descendingSort(arr, param);
		default:
			return randomSort(arr);
	}
};

export default sort;
