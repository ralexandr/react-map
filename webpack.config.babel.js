import path from 'path';
import webpack from 'webpack';
import {
	WEBPACK_ENTRY_POINT,
	WEBPACK_OUTPUT_FILE_PATH,
	WEBPACK_OUTPUT_FILE_NAME
} from './config';

// var BowerWebpackPlugin = require("bower-webpack-plugin");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
	cache: true,
	debug: false,
	entry: [ 'babel-polyfill', path.join(__dirname, WEBPACK_ENTRY_POINT)],
	output: {
		path: path.join(__dirname, WEBPACK_OUTPUT_FILE_PATH),
		filename: WEBPACK_OUTPUT_FILE_NAME
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx|es6)$/,
				loader: 'babel-loader',
				exclude: /(node_modules|libs)/,
				query: {
					// plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0', 'react']
				}
			},
			{
				//     test: /\.css$/,
				//     loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
				// }, {
				test: /\.json?$/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			// $: "jquery",
			// jQuery: "jquery",
			// "window.jQuery": "jquery",
			// "window.$": "jquery",
			// Slideout: "slideout",
		}),
		// new webpack.DefinePlugin({
		//   'process.env': {
		//     NODE_ENV: JSON.stringify('"production"')
		//   }
		// }),
		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.optimize.OccurenceOrderPlugin(),
		// new webpack.optimize.DedupePlugin()
	],
	resolve: {
		// extensions: ['', '.js', '.jsx', '.json'],
		root: [ path.join(__dirname, "./dist/static") ],
		modulesDirectories: ["node_modules"]
	},
	// resolve: {
	//     // You can now require('file') instead of require('file.coffee')
	//     // extensions: ["", ".js", ".jsx"],
	//     // extensions: [".jsx"],
	//     root: [path.join(__dirname, "public")],
	//     modulesDirectories: ["node_modules"]
	//     // modulesDirectories: ["./src", "node_modules", "libs"]
	// }
}];
