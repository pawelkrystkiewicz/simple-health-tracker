const config = {
	STAGE: process.env.NODE_ENV === 'production',
	BACKEND_URL_DEV: 'http://localhost:4000/graphql/',
	BACKEND_URL: '',
	GLOBAL_DATE_FORMAT: `YYYY-MM-DD HH:mm`,
	GLOBAL_TIME_FORMAT: `HH:mm`,
	POLL_INTERVAL: 1000,
	QUERY_ERROR_TEXT: `Brak połączenia`,
	QUERY_EMPTY_TEXT: `Brak danych`
};

export default config;
