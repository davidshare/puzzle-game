const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	mode: "production",
	entry: [
		'./src/app.js'
	],
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin()
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new HtmlWebpackPlugin({
			/** You can specify an HTML file here which will server as a template.
			 * This template will be used when generating the final html file
			 * if skiped, it will generate a simple html file.
			*/
			title: "Webpack starter",
			template: path.resolve('./src/index.html')
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.m?js$/, //use the following loaders for executing javascript files
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(jpeg|jpg|gif|png|svg|)$/,
				use: {
					loader: "file-loader",
					options: {
						outpath: './images',
						/* on build, webpack generates a hash for the image names.
						This line makes sure that it does not */
						name: "[name].[ext]",
					},
				},
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader"
				}
			}
		]
	}
}
