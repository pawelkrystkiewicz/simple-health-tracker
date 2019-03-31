import React from 'react';
import './styles/table.scss';
const Table = (props) => {
	const rows = props.data.map((entity) => (
		<div className="table-row">
			<span>{entity[props.propName1]}</span>
			<span>{entity[props.propName2]}</span>
			<span>{entity[props.propName3]}</span>
			<span>{entity[props.propName4]}</span>
			<span>{entity[props.propName5]}</span>
			<span>{entity[props.propName6]}</span>
			<span>{entity[props.propName7]}</span>
			<span>{entity[props.propName8]}</span>
		</div>
	));
	const columns = (
		<div className="table-header">
			<span className="table-header--col">{props.colName1}</span>
			<span className="table-header--col">{props.colName2}</span>
			<span className="table-header--col">{props.colName3}</span>
			<span className="table-header--col">{props.colName4}</span>
			<span className="table-header--col">{props.colName5}</span>
			<span className="table-header--col">{props.colName6}</span>
			<span className="table-header--col">{props.colName7}</span>
			<span className="table-header--col">{props.colName8}</span>
		</div>
	);
	return (
		<div className="table" style={{ height: props.height, width: props.width, color: props.color }}>
			{columns}
			<div className="table-row--wrapper">{rows}</div>
		</div>
	);
};

export default Table;
