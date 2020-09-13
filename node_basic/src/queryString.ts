import querystring from 'querystring';

// const str = 'name=zhangsan&address=xiamen';
// const obj = querystring.parse(str);
// console.log(obj); // { name: 'zhangsan', address: 'xiamen' }

const obj = { name: 'zhangsan', address: 'xiamen' };
const params = querystring.stringify(obj);
console.log(params); // name=zhangsan&address=xiamen
