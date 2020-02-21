const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ScriptPlugin = require("script-ext-html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")


const CONFIG = process.env.CONFIG
const isDev = CONFIG == "development"

console.log("\n\n")
console.log(`\x1b[32m\x1b[1m You are ${
	isDev ? "running app devserver." : `building app.`
}\x1b[0m`)
console.log("\n\n")

module.exports = {
	mode: isDev ? "development" : "production",
	entry: path.resolve(__dirname, "src/index.tsx"),
	output: isDev
		? {
			path: __dirname,
			filename: "dist/bundle.js",
			publicPath: "/"
		}
		: {
			path: path.resolve(__dirname, `dist/`),
			filename: `bundle.js`,
			publicPath: "/",
		},
	...(isDev ? 
	{
		devtool: "eval-source-map",
		devServer: {
			historyApiFallback: true,
			hot: true,
			disableHostCheck: true
		},
	} : {}),

	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
				loader: "awesome-typescript-loader",
			},
			{
				test: /\.(svg|woff|woff2|ttf|otf|png|jpg)$/,
				include: [
					path.resolve(__dirname, "node_modules"),
					path.resolve(__dirname, "src"),
				],
				loader: "url-loader"
			},
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.(sa|c)ss$/,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: { 
							sassOptions: {
								includePaths: [
									path.resolve(__dirname, "src")
								]
							}
						}
					}
				]
			},
		]
	},
	resolve: {
		modules: [
			"node_modules",
			path.resolve(__dirname, "src"),
		],
		extensions: [".js", ".jsx", ".sass", ".json", ".css", ".ts", ".tsx"]
	},
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [
		...(!isDev ? [
			new UglifyJsPlugin({
				exclude: [/\.(min|worker)\.js$/gi],
				uglifyOptions: {
					ie8: false,
					mangle: true,
					output: {
						comments: false,
						beautify: false
					}
				}
			}),
			new HtmlWebpackPlugin({
				template: "index.html",
				filename: "index.html"
			}),
			new MiniCssExtractPlugin({
				filename: `style.css`
			}),
			new ScriptPlugin({
				defaultAttribute: "async"
			}),
		] : []),
	],
}


// const path = require("path")
// const webpack = require("webpack")

// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const HtmlWebpackPlugin = require("html-webpack-plugin")
// const ScriptPlugin = require("script-ext-html-webpack-plugin")
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

// const TerserJSPlugin = require("terser-webpack-plugin")
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

// const CONFIG = process.env.CONFIG
// const isDev = CONFIG == "dev"

// console.log("\n\n")
// console.log(`\x1b[32m\x1b[1m You are ${
// 	isDev ? "running app devserver." : `building app.`
// }\x1b[0m`)
// console.log("\n\n")

// var config = {
// 	mode: isDev ? "development" : "production",
// 	entry: {
// 		app: path.resolve(__dirname, "src/index.tsx")
// 	},
// 	output:
// 		{
// 			path: __dirname,
// 			filename: "dist/bundle.js",
// 		},

// 	...(isDev ? 
// 	{
// 		devtool: "eval-source-map",
// 		devServer: {
// 			historyApiFallback: true,
// 			hot: true,
// 			disableHostCheck: true,
// 		},
// 	} : {}),

// 	module: {
// 		rules: [
// 			{
// 				test: /\.(t|j)sx?$/,
// 				loader: "awesome-typescript-loader",
// 				options: {
// 					useCache: false,
// 					usePrecompiledFiles: false
// 				},
// 				exclude: /node_modules\/(?!superagent)/,
// 			},
// 			{
// 				enforce: "pre",
// 				test: /\.js$/,
// 				loader: "source-map-loader"
// 			},
// 			{
// 				test: /\.(svg|woff|woff2|ttf|otf|png|jpg)$/,
// 				include: [
// 					path.resolve(__dirname, "node_modules"),
// 					path.resolve(__dirname, "src"),
// 				],
// 				loader: "url-loader"
// 			},
// 			{
// 				test: /\.html$/,
// 				loader: "html-loader"
// 			},
// 			{
// 				test: /\.worker\.js$/,
// 				use: {
// 					loader: "worker-loader",
// 					options: {
// 						name: `[name].js`,
// 					}
// 				}
// 			},
// 			{
// 				test: /\.(sa|c)ss$/,
// 				use: [
// 					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
// 					"css-loader",
// 					{
// 						loader: "sass-loader",
// 						options: { 
// 							sassOptions: {
// 								includePaths: [
// 									path.resolve(__dirname, "src")
// 								]
// 							}
// 						}
// 					}
// 				]
// 			},
// 		]
// 	},
// 	resolve: {
// 		modules: [
// 			"node_modules",
// 			path.resolve(__dirname, "src"),
// 		],
// 		extensions: [".js", ".jsx", ".sass", ".json", ".css", ".ts", ".tsx"]
// 	},
// 	optimization: {
// 		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
// 	},
// 	plugins: [
// 		...(!isDev ? [
// 			new UglifyJsPlugin({
// 				exclude: [/\.(min|worker)\.js$/gi],
// 				uglifyOptions: {
// 					ie8: false,
// 					mangle: true,
// 					output: {
// 						comments: false,
// 						beautify: false
// 					}
// 				}
// 			}),
// 			new HtmlWebpackPlugin({
// 				template: "index.ejs",
// 				filename: "index.html",
// 			}),
// 			new MiniCssExtractPlugin({
// 				filename: `style.css`
// 			}),
// 			new ScriptPlugin({
// 				defaultAttribute: "async"
// 			}),
// 		] : []),
// 	],
// }

// module.exports = config