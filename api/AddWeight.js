import gql from 'graphql-tag';

const ADD_WEIGHT = gql`
	mutation addWeight($data: WeightInput!) {
		addWeight(data: $data) {
			weight
			createdAt
			updatedAt
		}
	}
`;
export default ADD_WEIGHT;
