const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = async function () {
	return merge(await common(), {
		mode: 'development',
		devtool: 'source-map',
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			disableHostCheck: true,
			host: process.env.HOST || '127.0.0.1',
			allowedHosts: ['all'],
			port: parseInt(process.env.PORT) || 5080,
			hot: false,
			overlay: true,
			historyApiFallback: {
				rewrites: [{ from: /.*/, to: '/404.html' }]
			},
			index: 'index.html'
		},
		plugins: [
			new InjectManifest({
				swSrc: path.join(__dirname, 'src', 'service-worker.ts'),

				// Precaching assets triggers a warning when watching, so we
				// ignore all assets locally
				exclude: [/./]
			})
		]
	});
};
