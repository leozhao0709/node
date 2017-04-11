// const $ = require("jquery");
// const $ = require("../../node_modules/jquery/dist/jquery.min.js");

// css-loader
require("../sass/index.scss");

// json-loader
const stuJson = require("./stu.json");
let text = `my name is ${stuJson.name}`;

$("#welcome").html("Hello World!" + `<p>${text}</p>`);