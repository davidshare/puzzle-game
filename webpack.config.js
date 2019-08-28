const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	entry: [
		'./src/app.js'
	],
	watch: true,
	watchOptions: {
		poll: 2000, // check file changes every two seconds
		aggregateTimeout: 1000,
		ignored: /node_modules/
	},
	devtool: "source-maps",
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		watchContentBase: true,
		hot: true, // the changes should reflect without refreshing the page
		open: true, // specifies that the page should be open when the server is started
		inline: true // inject the styles in javascript inline
	},
	plugins: [
		new HtmlWebpackPlugin({
			/** You can specify an HTML file here which will server as a template.
			 * This template will be used when generating the final html file
			 * if skiped, it will generate a simple html file.
			*/
			title: "Webpack starter",
			template: path.resolve('./src/index.html')
		}),
		new webpack.HotModuleReplacementPlugin() // this will help the webserver run in hot mode
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
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
