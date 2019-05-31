// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

export const steps = (n: number) => {
  let i = 0;
  while (i < n) {
    let str = '';
    for (let j = 0; j < n; j++) {
      if (j <= i) {
        str += '#';
      } else {
        str += ' ';
      }
    }
    // tslint:disable-next-line: no-console
    console.log(str);
    i++;
  }
};
