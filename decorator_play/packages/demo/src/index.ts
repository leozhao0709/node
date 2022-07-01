import { CustomerService } from './CustomerService';

export const sum = (...nums: number[]) => nums.reduce((res, num) => res + num);

new CustomerService();
