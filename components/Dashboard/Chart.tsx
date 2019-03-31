//@ts-check
import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';


const Chart = (props) => {
	
	return (
		<ResponsiveContainer width="99%" height={320}>
			<LineChart data={props.data}>
				<YAxis domain={props.domain.Y} interval={props.interval.Y} />
				<XAxis dataKey={props.dataKeyX} />
				<Tooltip />
				<Line type={props.lineType} dataKey={props.lineDataKey} stroke={props.lineStroke} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Chart;
