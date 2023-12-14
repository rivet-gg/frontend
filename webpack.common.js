const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const Color = require('color');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { execSync } = require('child_process');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

if (!process.env.ASSETS_URL) process.env.ASSETS_URL = 'https://assets2.rivet.gg';

require('dotenv').config();

// Config
module.exports = async function () {
	console.log('Fetching assets');
	let rivetLogo = (
		await axios({
			url: process.env.ASSETS_URL + '/icons/logo/logo-gradient-white.svg',
			responseType: 'text'
		})
	).data;

	// Get define values
	let defineValues = {};

	// Expose environment variables
	// See https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables
	const envValues = {
		GIT_BRANCH:
			process.env.CF_PAGES_BRANCH || execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
		GIT_COMMIT: process.env.CF_PAGES_COMMIT_SHA || execSync('git rev-parse HEAD').toString().trim(),

		RIVET_NAMESPACE: process.env.CF_PAGES_BRANCH,

		RIVET_API_ENDPOINT: process.env.RIVET_API_ENDPOINT || '__AUTO__',
		ASSETS_URL: process.env.ASSETS_URL
	};
	for (let key in envValues) {
		defineValues[`ENV_${key}`] = JSON.stringify(process.env[key] || envValues[key]);
	}

	// Define colors
	const baseColors = {
		'dark-gray': '#232323',
		gray: '#404040',
		'light-gray': '#737373',

		red: '#F74051',
		orange: '#FF7854',
		yellow: '#FCC419',
		green: '#A3E35E',
		purple: '#A591F9',
		blue: '#03C8FF'
	};

	// Create color exports
	const colors = {};
	Object.assign(colors, baseColors);

	// Process colors
	for (let colorId in baseColors) {
		let color = Color(baseColors[colorId]);
		if (!colors[`dark-${colorId}`]) colors[`dark-${colorId}`] = color.darken(0.75).string();
		colors[`transparent-${colorId}`] = color.fade(0.75).string();
		colors[`backdrop-${colorId}`] = color.darken(0.5).fade(0.5).string();
	}

	// UI Constants
	Object.assign(colors, {
		'base-bg': '#18181b', // Also change this in html/index.html and html/static-styles.css
		'raised-bg': '#FFFFFF17',
		'lowered-bg': '#00000020',
		'context-menu': '#262626',
		'raised-hover': '#FFFFFF27',
		'muted-text': '#737373',
		'main-accent': '#7f56d9'
	});
	Object.assign(colors, {
		separator: '#4a4a4a'
	});

	// Export values
	defineValues['SHARED_COLORS'] = JSON.stringify(colors);

	// Construct CSS
	const generatedCSSConsts = `
	// Scss variable colors
	${Object.entries(colors)
		.map(([k, v]) => `$${k}: ${v};`)
		.join('\n')}
	`;

	console.log('defineValues:', JSON.stringify(defineValues));

	return {
		entry: {
			// JavaScript
			hub: path.join(__dirname, 'src', 'hub.ts'),
			// 'service-worker': path.join(__dirname, 'src', 'service-worker.ts'),
			'service-worker-loader': path.join(__dirname, 'src', 'service-worker-loader.ts')
		},
		output: {
			path: path.join(__dirname, 'dist'),
			filename: 'js/[name].[contenthash].js',
			publicPath: '/'
		},
		watchOptions: {
			ignored: /node_modules/
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			fallback: {
				fs: 'empty',
				crypto: false
			}
		},
		module: {
			rules: [
				{
					test: /common\.css$/,
					issuer: /src\/utils\/css.ts$/, // Issued from TS file
					use: ['css-loader', 'postcss-loader']
				},
				// Load SASS files from TypeScript files
				{
					test: /\.s[ca]ss$/,
					issuer: /\.tsx?$/, // Issued from TS file
					use: [
						{
							loader: 'css-loader',
							options: {
								// Disable sourcemaps since we prepend data to the Sass
								sourceMap: false
							}
						},
						// allows to use tailwind utilities in scss files
						'postcss-loader',
						{
							loader: 'sass-loader',
							options: {
								// See above
								sourceMap: false,

								// Append consts to every file; note that this is only to the root import and not the
								// imports from the root SASS file, so we don't need to filter the files it's applied
								// to
								additionalData: generatedCSSConsts
							}
						}
					]
				},

				// Load TypeScript
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},

				// Render handlebars
				{
					test: /\.hbs$/,
					loader: 'handlebars-loader'
				},
				{
					test: /\.json$/,
					type: 'json'
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin(defineValues),

			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: path.resolve(__dirname, 'html', 'index.hbs'),
				templateParameters: {
					rivetLogoEncoded: 'data:image/svg+xml,' + encodeURIComponent(rivetLogo)
				},
				output: path.join(__dirname, 'dist'),
				chunks: ['hub', 'service-worker-loader'],
				minify: true
			}),

			new MiniCssExtractPlugin(),

			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'html', 'icons'),
						to: path.join(__dirname, 'dist', 'icons')
					}
				]
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'html', 'fonts'),
						to: path.join(__dirname, 'dist', 'fonts')
					}
				]
			}),

			...(process.env.WEBPACK_BUILD_ANALYZER
				? [
						new BundleAnalyzerPlugin({
							analyzerHost: '0.0.0.0',
							openAnalyzer: false
						})
				  ]
				: [])
		]
	};
};
