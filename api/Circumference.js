import gql from 'graphql-tag';

const CIRCUMFERENCE = gql`
	{
		circumference {
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
export default CIRCUMFERENCE;
