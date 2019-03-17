import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import WeightList from '../components/WeightList';
import QueryHOC from '../components/QueryHOC';
import Spinner from '../components/Spinner';
import NoData from '../components/NoData';
import Disconnected from '../components/Disconnected';
import config from '../utils/config';
import '../static/styles/app.scss';
import WithApollo from '../lib/with-apollo-client';
class Dashboard extends React.Component {
	static pageTransitionDelayEnter = true;

	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	}

	componentDidMount() {
		this.timeoutId = setTimeout(() => {
			this.props.pageTransitionReadyToEnter();
			this.setState({ loaded: true });
		}, 1000);
	}

	componentWillUnmount() {
		if (this.timeoutId) clearTimeout(this.timeoutId);
	}

	render() {
		if (!this.state.loaded) return null;
		return (
			<div>
				<Link href="/">
					<a>Go back home</a>
				</Link>
				<QueryHOC
					entities="weight"
					fields="weight"
					// var={{ name: 'RouteId', type: 'Float!' }}
					component={WeightList}
					noDataComponent={NoData}
					errorComponent={Disconnected}
					loadingComponent={<Spinner />}
					options={{
						// variables: { RouteId: context.state.routeId },
						pollInterval: config.POLL_INTERVAL
					}}
				/>
			</div>
		);
	}
}

Dashboard.propTypes = {
	pageTransitionReadyToEnter: PropTypes.func
};

Dashboard.defaultProps = {
	pageTransitionReadyToEnter: () => {}
};

export default Dashboard;
