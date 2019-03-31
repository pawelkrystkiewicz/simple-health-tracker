import { BACKEND_URL, BACKEND_URL_DEV, PROD } from '../utils/config';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import fetch from 'node-fetch';

console.log(BACKEND_URL)
export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createHttpLink({
		uri: PROD ? BACKEND_URL : BACKEND_URL_DEV,
		credentials: 'include',
		fetch: fetch
	})
});
