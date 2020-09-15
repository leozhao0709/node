// console.log(process.version); // node version
// console.log(process.versions); // detailed node version
// console.log(process.platform); // platform
// console.log(process.execPath); // node bin path
// console.log(process.config); // lot of config
// console.log(process.pid); // pid
// console.log(process.title); // node
// console.log(process.arch); // x64
// console.log(process.memoryUsage());
// console.log(process.cwd()); // current working directory (process root folder)
// process.chdir('../'); // change dir
// console.log(process.env); // env
// process.env.NODE_ENV = 'dev';
// console.log(process.uptime());

// process.on('exit', () => {
//   console.log('node process exited');
// });

// // process.exit(0);

// process.on('beforeExit', () => {
//   console.log('node process before exited');
// });

// process.on('uncaughtException', (error) => {
//   console.log(error);
//   console.log('=======');
//   console.log('uncaughtException occured');
// });

// process.on('SIGINT', () => {
//   console.log('received SIGINT info');
//   process.exit(0);
// });

// setTimeout(() => {
//   console.log('timeout');
// }, 5000);
