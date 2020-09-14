import fs from 'fs';
import path from 'path';

// fs.readFile(path.resolve(__dirname, 'fileTemp/file2.ts'), { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });

// fs.writeFile(path.resolve(__dirname, 'fileTemp/test.txt'), 'mytest2, node', { encoding: 'utf-8', flag: 'a' }, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });

// fs.unlink(path.resolve(__dirname, 'fileTemp/test.txt'), (error) => {
//   if (error) {
//     throw error;
//   }

//   console.log('success');
// });

// fs.rename(path.resolve(__dirname, 'fileTemp/test.txt'), path.resolve(__dirname, 'fileTemp/hello.txt'), (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

// fs.stat(path.resolve(__dirname, 'fileTemp/hello.txt'), (err, stats) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(stats);
// });

// fs.mkdir(path.resolve(__dirname, 'hello/world'), { recursive: true }, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

// const readDir = (dirPath) =>
//   fs.readdir(dirPath, (err, files) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     if (files.length === 0) {
//       console.log(dirPath);
//       return;
//     }

//     files.forEach((file) => {
//       const filePath = path.resolve(dirPath, file);
//       fs.stat(filePath, (err, stats) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         if (stats.isFile()) {
//           console.log(filePath);
//         } else if (stats.isDirectory()) {
//           readDir(filePath);
//         }
//       });
//     });
//   });

// readDir(__dirname);

// fs.readdir(__dirname, (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(files);
// });

// fs.access(path.resolve(__dirname, 'index.ts'), (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

// try {
//   fs.accessSync(path.resolve(__dirname, 'index1.ts'));
// } catch (error) {
//   console.log('no such file!');
// }

// fs.rmdir(path.resolve(__dirname, 'hello'), { recursive: true }, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });
