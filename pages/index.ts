import * as React from 'react';
import config from '../utils/config';
import '../static/styles/app.scss';
import LoginApollo from '../components/LoginApollo';

const Index: React.FunctionComponent = () => (
	<div>
		<div className="hero">
			<center>
				<LoginApollo />
			</center>
		</div>
	</div>
);

export default Index;
