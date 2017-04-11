module.exports = {
    entry: __dirname + "/src/js/index.js",
    output: {
        path: __dirname + "/assets/js",
        filename: "index.js",
        publicPath:"/temp/"
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
            }
        ]
    }
}