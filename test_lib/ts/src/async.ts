import * as fs from "fs";

// fs.readFile("../test/file1.txt", (err, content) => {
//     console.log("finish file1");
//     console.log(content);
// });
// fs.readFile("../test/file2.txt", (err, content) => {
//     console.log("finish file2");
//     console.log(content);
// });
// fs.readFile("../test/file3.txt", (err, content) => {
//     console.log("finish file3");
//     console.log(content);
// });

// promise implementation

let readFile = function readFile(file: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, content) => {
            if (err) {
                reject(err);
            }
            resolve({content, file});
        });
    });
};

// readFile("../test/file1.txt").then(({content, file}) => {
//     console.log(content);
//     console.log(file);
//     return readFile("../test/file2.txt");
// })
// .then(({content, file}) => {
//     console.log(content);
//     console.log(file);
//     return readFile("../test/file3.txt");
// })
// .then(({content, file}) => {
//     console.log(content);
//     console.log(file);
// });

let test = async function () {
    try {
        console.log( await readFile("../test/file1.txt"));
        console.log( await readFile("../test/file2.txt"));
        console.log( await readFile("../test/file3.txt"));
    } catch (error) {
        console.log(error);
    }
}();
