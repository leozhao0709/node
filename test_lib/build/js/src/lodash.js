"use strict";
exports.__esModule = true;
var _ = require("lodash");
var user1 = {
    name: "zhangsan",
    height: 180,
    weight: 120
};
var user2 = {
    name: "lisi",
    height: 180,
    weight: 130
};
var user3 = {
    name: "zhangsan",
    height: 180,
    weight: 131
};
var users = [user1, user2, user3];
// let result =  _.find(users, {name: "zhangsan"});
// let result = _.findIndex(users, {name: "zhangsan", weight: 131});
// let result = _.filter(users, {name: "zhangsan"});
// let result = _.filter(users, (user) => {
//     return user.weight > 125;
// });
// let result = _.map(users, "name");
// let result = _.map(users, (user) => {
//     return {
//         name: user.name,
//         height: user.height,
//         age: 20
//     };
// });
// let result = _.remove(users, {name: "zhangsan"});
// let result = _.uniqBy(users, "name");
var result = _.chain(users).filter({ name: "zhangsan" }).uniqBy("name").map("weight").value();
console.log(result);
// console.log(users);
