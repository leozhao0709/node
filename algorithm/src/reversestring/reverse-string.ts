export const reverseString = (s: string) => {
  if (s.length === 0) {
    return '';
  }

  let i = s.length - 1;
  let reversedStr = '';
  while (i >= 0) {
    reversedStr += s[i];
    i--;
  }
  return reversedStr;
};
