const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, 'index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../showcase-dist')
	},
	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, '../showcase-dist'),
		publicPath: '/',
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					query: JSON.stringify({
						plugins: ["react-hot-loader/babel"],
						presets: ['env', 'react']
					}),
				},
				include: [
					__dirname,
					path.resolve(__dirname, '../src'),
				],
				exclude: [
					path.resolve(__dirname, './webpack.config.js'),
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html'),
			cache: true,
			inject: 'body'
		}),
	]
};
