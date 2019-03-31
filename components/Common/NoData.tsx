import React from 'react';
import { Inbox } from '@material-ui/icons';
import config from '../../utils/config';
const NoData = () => (
	<center style={{padding:20}}>
		<Inbox color="primary" style={{ height: 40, width: 'auto' }} />
		<p>{config.QUERY_EMPTY_TEXT}</p>
	</center>
);

export default NoData;
