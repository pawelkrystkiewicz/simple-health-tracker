import React from 'react';
import { PowerOff } from '@material-ui/icons';
import config from '../utils/config';

const Disconnected = (props) => (
	<center style={{ padding: 20 }}>
		<PowerOff color="primary" style={{ height: 40, width: 'auto' }} />
		{props.data.error.graphQLErrors[0] ? (
			<p>{props.data.error.graphQLErrors[0].message}</p>
		) : props.data.error.networkError ? (
			<p>{props.data.error.networkError.message}</p>
		) : props.errors[0] ? (
			<p>{props.errors[0].message}</p>
		) : (
			<p>{config.QUERY_ERROR_TEXT}</p>
		)}
	</center>
);

export default Disconnected;
