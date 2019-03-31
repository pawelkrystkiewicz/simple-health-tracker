//@ts-check
import React, { Component, Fragment } from 'react';
import { sumArrayByProperty } from '../../utils/helpers';
import parseISO from 'date-fns/parseISO';
import Chart from './Chart';
import AvgWeightCard from './InfoCard';
import AddWeightRecordMutation from './AddWeight';
import LineExample from './LineChart'
const WeightList = (props) => {
	const weight = props.data;
	const sum = sumArrayByProperty('weight', weight);
	const avg = (sum / weight.length).toFixed(1);
	const getAverageWeight = (arr) => (sumArrayByProperty('weight', arr) / arr.length).toFixed(1);

	const groupByWeek = weight.reduce((outcome, record) => {
		let date = parseISO(record.createdAt);
		let yearWeek = record.createdAt;
		if (typeof outcome[yearWeek] === 'undefined') {
			outcome[yearWeek] = [];
		}
		outcome[yearWeek].push(record);
		return outcome;
	}, {});
	let a = [];

	Object.entries(groupByWeek).forEach(([ key, value ]) => {
		let object = { Weight: getAverageWeight(value), Date: key };
		a.push(object);
	});
	const currentWeeksWeight = a[a.length - 1];
	return (
			<span>{Chart(props.data)}</span>

	);
};

export default WeightList;

{/* <span>{AvgWeightCard(currentWeeksWeight)}</span> */ }
{/* <LineExample data={props.data.entities}/> */ }