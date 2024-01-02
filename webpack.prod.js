const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { InjectManifest } = require('workbox-webpack-plugin');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = async function () {
	return merge(await common(), {
		mode: 'production',
		devtool: 'source-map',
		plugins: [
			new InjectManifest({
				swSrc: path.join(__dirname, 'src', 'service-worker.ts'),
				exclude: [/icons/, /\.map$/, /^manifest.*\.js$/],
				maximumFileSizeToCacheInBytes: 32 * 1000 * 1000
			}),
			sentryWebpackPlugin({
				authToken: process.env.SENTRY_AUTH_TOKEN,
				org: 'rivet-gg',
				project: 'hub'
			})
		]
	});
};
