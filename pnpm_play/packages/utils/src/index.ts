const utilsLog = () => {
  console.log('-----this is util=---');
};

export const sum = (...nums: number[]) => nums.reduce((res, num) => res + num);

export default utilsLog;
