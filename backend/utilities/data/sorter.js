import ServerError from '../errors/ServerError.js';
const ascendingSort = (arr, param) => {
	return arr.sort((a, b) => (a[param] < b[param] ? -1 : a[param] > b[param] ? 1 : 0));
};
const descendingSort = (arr, param) => {
	return arr.sort((a, b) => (a[param] < b[param] ? 1 : a[param] > b[param] ? -1 : 0));
};

const sort = (arr, method, param) => {
	if (method && !param)
		throw new ServerError(
			'Undefined parameter for sorting function at GET /beers',
			400
		);
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
