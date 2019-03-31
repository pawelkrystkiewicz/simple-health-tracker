import React from 'react'
import { graphql } from 'react-apollo';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import ADD_CIRCUMFERENCE from '../../api/AddCircumference';
const styles = (theme) => ({
	fab: {
		margin: theme.spacing.unit
	},
	extendedIcon: {
		marginRight: theme.spacing.unit
	}
});
const inputProps = {
	step: 0.1,
	max: 250.0,
	min: 10.0
};
class AdCircumferenceRecord extends React.Component {
	state = {
		neck: null,
		forearm: null,
		waist: null,
		abdomen: null,
		hips: null,
		thigh: null,
		calf: null,
		wrist: null,
		date: null,
		error: null,
		modifyDate: false
	};

	componentDidMount() {
		this.setState(() => ({ date: new Date() }));
	}

	handleChange = (e) => {
		this.setState({ modifyDate: event.target.checked });
	};
	onFormSubmit = (e) => {
		e.preventDefault();
		console.log(this.state)
		const { neck, forearm, waist, abdomen, hips, thigh, calf, wrist, date } = this.state;
		if (
			neck.length > 0 &&
			forearm.length > 0 &&
			waist.length > 0 &&
			wrist.length > 0 &&
			abdomen.length > 0 &&
			hips.length > 0 &&
			thigh.length > 0 &&
			calf.length > 0
		) {
			this.props
				.mutate({
					variables: {
						data: {
							neck: Number(neck),
							forearm: Number(forearm),
							waist: Number(waist),
							abdomen: Number(abdomen),
							hips: Number(hips),
							thigh: Number(thigh),
							calf: Number(calf),
							wrist: Number(wrist),
							createdAt: date === new Date() ? null : date.toISOString()
						}
					}
				})
				.then(() => {
					this.setState({ error: `Success` });
				})
				.catch(({ graphQLErrors: err }) => this.setState({ error: err }));
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<FormGroup row>
					<form onSubmit={this.onFormSubmit} key="form">
						<div>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.modifyDate}
										onChange={this.handleChange}
										value={this.state.modifyDate}
									/>
								}
								label="Modify date"
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Neck"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ neck: e.target.value })}
								value={this.state.neck}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Forearm"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ forearm: e.target.value })}
								value={this.state.forearm}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Waist"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ waist: e.target.value })}
								value={this.state.waist}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Abdomen"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ abdomen: e.target.value })}
								value={this.state.abdomen}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Hips"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ hips: e.target.value })}
								value={this.state.hips}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Thigh"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ thigh: e.target.value })}
								value={this.state.thigh}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Calf"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ calf: e.target.value })}
								value={this.state.calf}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<TextField
								id="outlined-dense"
								type="number"
								inputProps={inputProps}
								label="Wrist"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ wrist: e.target.value })}
								value={this.state.wrist}
								endAdornment={<InputAdornment position="end">cm</InputAdornment>}
							/>
							<span className="error">{this.state.error}</span>
						</div>
						{this.state.modifyDate && (
							<InlineDatePicker
								keyboard
								inputProps={inputProps}
								variant="outlined"
								autoOk
								clearable
								disableFuture
								label="Custom date"
								format={'dd/MM/yyyy'}
								mask={(value) =>
									value ? [ /\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/ ] : []}
								value={this.state.date}
								onChange={(date) => {
									this.setState({ date });
								}}
							/>
						)}
						<div>
							<Button
								color="secondary"
								aria-label="Add"
								variant="raised"
								type="submit"
								className={classes.fab}
							>
								ADD
							</Button>
						</div>
					</form>
				</FormGroup>
			</MuiPickersUtilsProvider>
		);
	}
}

AdCircumferenceRecord.propTypes = {
	classes: PropTypes.object.isRequired
};

const AdCircumferenceRecordMutation = graphql(ADD_CIRCUMFERENCE)(AdCircumferenceRecord);
export default withStyles(styles)(AdCircumferenceRecordMutation);
