import * as React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Authenticated from '../layouts/Authenticated/Authenticated';

const DashboardPage = (props) => (
	<Authenticated title={`Dashboard`} breadcrumb={'Weight'}>
		<Dashboard />
	</Authenticated>
);

export default DashboardPage;
