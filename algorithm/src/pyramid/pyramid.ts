// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a pyramid shape
// with N levels using the # character.  Make sure the
// pyramid has spaces on both the left *and* right hand sides
// --- Examples
//   pyramid(1)
//       '#'
//   pyramid(2)
//       ' # '
//       '###'
//   pyramid(3)
//       '  #  '
//       ' ### '
//       '#####'

export const pyramid = (n: number) => {
  for (let i = 0; i < n; i++) {
    let str = '';
    for (let j = 0; j < 2 * n - 1; j++) {
      if (j < n - i - 1 || j > n - 1 + i) {
        str += ' ';
      } else {
        str += '#';
      }
    }
    // tslint:disable-next-line: no-console
    console.log(str);
  }
};
