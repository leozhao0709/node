import utilsLog, { sum } from '@pnpm-play/utils';

console.log('---this is debug1234---');
utilsLog();

export const debugSum = (...nums: number[]) => sum(...nums);

console.log(debugSum(1, 2, 3));
