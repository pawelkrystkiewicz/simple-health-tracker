import gql from 'graphql-tag';

const ADD_CIRCUMFERENCE = gql`
	mutation addCircumference($data: CircumferenceInput!) {
		addCircumference(data: $data) {
			neck
			forearm
			waist
			abdomen
			hips
			thigh
			calf
			wrist
			createdAt
			updatedAt
		}
	}
`;
export default ADD_CIRCUMFERENCE;
