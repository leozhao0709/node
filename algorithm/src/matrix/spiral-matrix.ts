// --- Directions
// Write a function that accepts an integer N
// and returns a NxN spiral matrix.
// --- Examples
//   matrix(2)
//     [[1, 2],
//     [4, 3]]
//   matrix(3)
//     [[1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]]
//  matrix(4)
//     [[1,   2,  3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10,  9,  8, 7]]

export const matrix = (n: number) => {
  const result = new Array(n).fill(0).map(() => new Array(n));

  let startRow = 0;
  let startColumn = 0;
  let endRow = n - 1;
  let endColumn = n - 1;
  let count = 1;

  while (startRow <= endRow && startColumn <= endColumn) {
    // top row
    for (let i = startColumn; i <= endColumn; i++) {
      result[startRow][i] = count;
      count++;
    }
    startRow++;

    // right column
    for (let i = startRow; i <= endRow; i++) {
      result[i][endColumn] = count;
      count++;
    }

    endColumn--;

    // bottom row
    for (let i = endColumn; i >= startColumn; i--) {
      result[endRow][i] = count;
      count++;
    }
    endRow--;

    // left column
    for (let i = endRow; i >= startRow; i--) {
      result[i][startColumn] = count;
      count++;
    }
    startColumn++;
  }

  return result;
};
