export const quickSort = (arr: number[], left = 0, right = arr.length - 1) => {
  if (left >= right) {
    return arr;
  }
  const pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);

  return arr;
};

const partition = (arr: number[], left: number, right: number) => {
  const randomIndex = Math.floor(Math.random() * (right - left + 1) + left);
  [arr[randomIndex], arr[left]] = [arr[left], arr[randomIndex]];

  const pivot = arr[left];

  let pivotIndex = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < pivot) {
      [arr[i], arr[pivotIndex + 1]] = [arr[pivotIndex + 1], arr[i]];
      pivotIndex++;
    }
  }
  [arr[pivotIndex], arr[left]] = [arr[left], arr[pivotIndex]];
  return pivotIndex;
};
