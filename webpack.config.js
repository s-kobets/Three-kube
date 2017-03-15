'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// ENV: 'dev', 'dist'
const ENV = {
	production: 'production',
	development: 'development'
};

const isDev = process.env.NODE_ENV !== ENV.production;

const definePlugins = {
	'process.env.version': new Date().getTime(),
	'process.env.NODE_ENV': JSON.stringify(isDev ? ENV.development : ENV.production)
};

// Default plugins
let plugins = [
	new webpack.DefinePlugin(definePlugins),

	//one HTML file
    // new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     inject : true,
    //     devServer: 'http://localhost:8800',
    //     template: './static_src/index.html',
    //     chunks: 'filename'
    // })
];

if (isDev) {
	// Development plugins
	plugins = plugins.concat([
	]);
} else {
	// Dist plugins
	plugins = plugins.concat([
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new UglifyJSPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	]);
}

module.exports = {
	entry: {
		main : './static_src/js/main.js'
	},
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/public/',
		filename: '[name].js'
	},
	module: {
		rules: [
			// JS
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'eslint-loader',
					options: {
						configFile: path.join(__dirname, '.eslintrc'),
						rules: {semi: 0}
					},
				}],
				enforce: 'pre',
				exclude: /(node_modules)/
			}
		]
	},
	devtool: 'sourcemap',
	plugins: plugins,
	resolve: {
		extensions: ['.js'],
		modules: ['./static_src', './node_modules'],
		alias: {
			node_modules: path.join(__dirname, 'node_modules')
		}
	}
};
