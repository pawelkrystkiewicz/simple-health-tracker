import React from 'react';
import { graphql } from 'react-apollo';

const graphqlDynamic = (query, config) => {
    return (component) => {
        return (props) => {
            return React.createElement(graphql(query(props), config(props))(component), props);
        };
    };
};

export { graphqlDynamic };