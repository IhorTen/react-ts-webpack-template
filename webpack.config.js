const path = require("path")
const webpack = require("webpack")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ScriptPlugin = require("script-ext-html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const dev = "localhost:1992"
const isDev = process.env.NODE_ENV === "development"

module.exports = {
    mode: isDev ? "development" : "production",
    entry: {
        app: path.resolve(__dirname, "src/index.tsx")
    },
    output: {
            path: __dirname,
            filename: "dist/bundle.js",
            publicPath: "/"
        },

    ...(isDev ?
    {
        devtool: "eval-source-map",
        devServer: {
			historyApiFallback: true,
			hot: true,
			disableHostCheck: true,
			proxy: {
				"/api/**": { 
					target: http(dev), 
					secure: false, 
					changeOrigin: true 
				},
            }
        },
    } : {}),

    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    useCache: false,
					usePrecompiledFiles: false
                },
                exclude: /node_modules\/(?!superagent)/,
            },
            {
                enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
            },
            {
				test: /\.(svg|woff|woff2|ttf|otf|png|jpg)$/,
                include: [
					path.resolve(__dirname, "node_modules"),
					path.resolve(__dirname, "src"),
                ],
				loader: "url-loader",
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
		minimizer: [new TerserWebpackPlugin({}), new OptimizeCssAssetsPlugin({})],
    },
    plugins: [
        new webpack.DefinePlugin({
            "ENV": JSON.stringify(process.env.CONFIG),
			"process.env.HOST": "window.location.origin",
			"process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production")
        }),
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
				template: "index.ejs",
				filename: "index.html",
				_preload: "",
				_title: "${__rh-title}",
				_meta: "${__rh-meta}",
				_link: "${__rh-link}",
				_htmlAttributes: "${__rh-htmlAttributes}",
				_bodyAttributes: "${__rh-bodyAttributes}",
				_body: "${__body}"
			}),
			new MiniCssExtractPlugin({
				filename: `style.css`
			}),
			new ScriptPlugin({
				defaultAttribute: "async"
			}),
		] : []),
    ]
}
