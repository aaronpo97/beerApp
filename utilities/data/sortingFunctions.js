export const ascendingSort = (arr, param) =>
  arr.sort((a, b) => (a[param] < b[param] ? -1 : a[param] > b[param] ? 1 : 0));

export const descendingSort = (arr, param) =>
  arr.sort((a, b) => (a[param] < b[param] ? 1 : a[param] > b[param] ? -1 : 0));

export const randomSort = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
