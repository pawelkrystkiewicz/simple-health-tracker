import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { sumArrayByProperty } from '../../utils/helpers';
import parseISO from 'date-fns/parseISO';

const InfoCard = (props) => (
	<Card style={{ width: props.width }} className="card">
		{!!props.title ? (
			<CardHeader
				className="title"
				subheaderTypographyProps={{ align: 'right' }}
				subheader={props.title.toUpperCase()}
			/>
		) : null}
		<CardContent className="content">
			<Typography variant="h2">
				{`${Number(props.value)}`}
				{!!props.unit && <span className="subtext">{`${props.unit}`}</span>}
			</Typography>
		</CardContent>
	</Card>
);

export default InfoCard;
