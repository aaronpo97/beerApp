/* eslint-disable no-else-return */
type arrT = any[];
type paramT = string;
export const ascendingSort = (arr: arrT, param: paramT): arrT =>
  arr.sort((a, b) => {
    if (a[param] < b[param]) {
      return -1;
    } else if (a[param] > b[param]) {
      return 1;
    } else {
      return 0;
    }
  });

export const descendingSort = (arr: arrT, param: paramT): arrT =>
  arr.sort((a, b) => {
    if (a[param] < b[param]) {
      return 1;
    } else if (a[param] > b[param]) {
      return -1;
    } else {
      return 0;
    }
  });

export const randomSort = (array) => {
  const sortedArray = array;
  for (let i = sortedArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = sortedArray[i];
    sortedArray[i] = sortedArray[j];
    sortedArray[j] = temp;
  }
  return sortedArray;
};
