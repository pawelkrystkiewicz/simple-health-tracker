import gql from 'graphql-tag';

const WEIGHT = gql`
	{
  weight {
    weight
    createdAt
    updatedAt
  }
}

`;
export default WEIGHT;
