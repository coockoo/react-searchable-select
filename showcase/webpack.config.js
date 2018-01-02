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
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'less-loader'
				],
				include: [
					__dirname,
					path.resolve(__dirname, '../src'),
				],
			},
			{
				test: /\.svg$/,
				use: 'file-loader',
				include: [
					path.resolve(__dirname, '../src'),
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
		new webpack.DefinePlugin({
			'process.env': JSON.stringify('development'),
		}),
	]
};
