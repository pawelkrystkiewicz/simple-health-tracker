import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import '../static/styles/app.scss';
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<html lang="en">
				<Head>
					<style>@import url('https://fonts.googleapis.com/css?family=Open+Sans');</style>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
