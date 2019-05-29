// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

// solution 1
// export const chunk = (arr: number[], size: number) => {
//   return arr.reduce((prev: number[][], curr) => {
//     const last = prev[prev.length - 1];
//     if (last && last.length < size) {
//       prev[prev.length - 1] = [...prev[prev.length - 1], curr];
//       // last.push(curr);
//     } else {
//       prev.push([curr]);
//     }
//     return prev;
//   }, []);
// };

// solution 2

export const chunk = (arr: number[], size: number) => {
  const chunked: number[][] = [];
  let index = 0;
  while (index < arr.length) {
    chunked.push(arr.slice(index, index + size));
    index += size;
  }

  return chunked;
};
