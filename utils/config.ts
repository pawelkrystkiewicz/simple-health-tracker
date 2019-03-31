import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
	case 'test':
		path = `${__dirname}/../../.env.test`;
		break;
	case 'production':
		path = `${__dirname}/../../.env.production`;
		break;
	default:
		path = `${__dirname}/../../.env`;
}
dotenv.config({
	path: path
});

export const PROD = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT;
export const APP_ID = process.env.APP_ID;
export const APP_NAME = process.env.SERVICE_NAME;
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const BACKEND_URL_DEV = process.env.BACKEND_URL_DEV;
export const BACKEND_URL = process.env.BACKEND_URL;
export const GLOBAL_DATE_FORMAT = `YYYY-MM-DD HH:mm`;
export const GLOBAL_TIME_FORMAT = `HH:mm`;
export const POLL_INTERVAL = 1000 * 60 * 30;
export const QUERY_ERROR_TEXT = `Brak połączenia`;
export const QUERY_EMPTY_TEXT = `Brak danych`;
