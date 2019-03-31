require('console-stamp')(console, { pattern: 'HH:MM:ss.l' });
import * as express from 'express';
import * as next from 'next';
import * as Cookies from 'js-cookie';
import * as cookie from 'cookie';
import IS_LOGGED_IN from '../api/IsLoggedIn';
import {client} from './auth'
const server = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// const cookieSessionName = 'sid'; //to config
const handle = app.getRequestHandler();
// const router = express.Router();
const parseCookies = (req, options = {}) => {
	return cookie.parse(req ? req.headers.cookie || '' : Cookies.get(), options);
};
const getToken = (req) => {
	const cookie = parseCookies(req).sid;
	// let cookie = 'sid='.concat(encodeURIComponent(parseCookies(req, res).sid));
	return cookie;
};
const isAuthorized = async (req, res, next) => {
	const cookie = getToken(req);
	await client
		.query({
			query: IS_LOGGED_IN,
		})
		.then((data) => {
			// const result = data.data.IsLoggedIn;
			console.log('Auth:',data.data.isLoggedIn);
			// if (req.path === "/") {
			//   result === true ? res.redirect("/dashboard") : next();
			// } else {
			//   result === true ? next() : res.redirect("/");
			// }
		})
		.catch((err) => console.error(err));

	if (req.path === '/') {
		!!cookie ? res.redirect('/dashboard') : next();
	} else {
		!!cookie ? next() : res.redirect('/');
	}
	return next();
};

app
	.prepare()
	.then(() => {
		server
			.get('/', isAuthorized, (req, res, next) => handle(req, res))
			.get('/dashboard', isAuthorized, (req, res, next) => handle(req, res))
			.get('*', (req, res, next) => handle(req, res))
			.listen(port, () => {
				console.log(`> Ready on http://localhost:${port}`);
			});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
