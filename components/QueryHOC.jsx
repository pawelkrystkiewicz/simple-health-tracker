import gql from 'graphql-tag';
import { graphqlDynamic } from './DynamicQuery';
import { withStyles } from '@material-ui/core/styles';
import withApollo from '../lib/with-apollo-client';

const ListEntities = (props) => {
	const { errorComponent } = props;
	if (props.data.loading) return props.loadingComponent || null;
	if (props.data.error) {
		// console.log(props.data.error.networkError.message);
		return props.errorComponent(props) || null;
	}
	if (!props.data.entities.length && !props.data.entities) return props.noDataComponent || null;
	if (props.list && !props.data.entities[0]) return props.noDataComponent || null;
	return props.component(props);
};

const query = (props) => {
	return gql`
		query ${props.entities} {
			entities: ${props.entities} {
				${props.fields}
			}
		}
	`;
};

const config = (props) => {
	const { options } = props;
	return { options };
};

const NewQuery = graphqlDynamic(query, config)(ListEntities);
const QueryHOC = withApollo(NewQuery);
export default QueryHOC;
