const webpack = require("webpack");
const extractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// process.noDeprecation = true
module.exports = {
    entry:{
        app: __dirname + "/src/js/index.js",
        more: [__dirname + "/src/js/sub.js", __dirname + "/src/js/add.js"],
        v: ["jquery"]
    } ,
    output: {
        path: __dirname + "/assets/",
        filename: "js/[name].js",
    },
    devServer: {
        contentBase: "./",
        host:"localhost",
        port:"3333",
    },
    module: {
        loaders:[
            {
                test:/\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test:/\.json$/,
                loader: "json-loader"
            },
            {
                test:/\.js$/,
                loader: "babel-loader",
                query: {
                    presets:["es2015"],
                    compact: false
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"webpack app",
            filename:"../index.html",
            template: __dirname + "/src/template/index.html",
            inject: "body"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // new webpack.optimize.CommonsChunkPlugin({name: "v", filename: "lib/jquery.min.js"})
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["add", "sub"]
        // })
    ],
    // watch: true
}