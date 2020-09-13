import url from 'url';

// const urlString = 'http://www.test.com?orderId=12345';
// const urlObj = url.parse(urlString);
// console.log(urlObj);

/**Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.test.com',
  port: null,
  hostname: 'www.test.com',
  hash: null,
  search: '?orderId=12345',
  query: 'orderId=12345',
  pathname: '/',
  path: '/?orderId=12345',
  href: 'http://www.test.com/?orderId=12345'
} */

// const urlObj: url.UrlObject = {
//   host: 'www.test.com',
//   port: 80,
//   protocol: 'http',
//   search: '?order=12345',
//   query: 'order=12345',
//   pathname: '/',
// };

// const address = url.format(urlObj);
// console.log(address); // http://www.test.com/?orderId=12345

const urlAddress = url.resolve('http://www.test.com', 'order');
console.log(urlAddress); // http://www.test.com/order
