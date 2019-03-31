require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = withTypescript(
	withSass({
		webpack: (config) => {
			config.node = {
				fs: 'empty'
			};
			config.plugins = config.plugins || [];

			config.plugins = [
				...config.plugins,
				// Read the .env file
				new Dotenv({
					path: path.join(__dirname, '.env'),
					systemvars: true
				})
			];

			return config;
		}
	})
);
