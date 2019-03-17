import withApollo from '../lib/with-apollo-client';
import React, { Component, Fragment } from 'react';
import format from 'date-fns/format';

const WeightList = (props) => {
	props.data.entities.map((entity) => <span>{entity.weight}</span>);
};

export default WeightList;
