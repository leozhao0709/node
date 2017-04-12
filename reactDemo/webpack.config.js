const webpack = require("webpack");

module.exports = {
	devtool: "inline-source-map",
	entry: ["./client/client.js"],
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js",
		publicPath: "/"
	},

	devServer: {
		contentBase: "./",
		host: "localhost",
		port: "3000",
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: "babel-loader",
			exclude: "/node_modules",
			query: {
				presets: ["es2015", "react"],
				compact: false
			}
		}]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	]
};