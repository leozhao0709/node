// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

export const maxChar = (s: string) => {
  const frequency = {};
  let maxCount = 0;
  let maxCharacter = '';

  for (const char of s) {
    frequency[char] = (frequency[char] || 0) + 1;
    if (frequency[char] > maxCount) {
      maxCount = frequency[char];
      maxCharacter = char;
    }
  }

  return maxCharacter;
};
