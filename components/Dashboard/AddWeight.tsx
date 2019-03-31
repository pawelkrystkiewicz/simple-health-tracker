import { graphql } from 'react-apollo';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Fab, Icon, Card, CardContent, TextField, InputAdornment } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import ADD_WEIGHT from '../../api/AddWeight';
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
	min: 40.0
};
class AddWeightRecord extends React.Component {
	state = {
		weight: 0,
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
		let { weight, date } = this.state;
		if (weight.length > 0) {
			this.props
				.mutate({
					variables: {
						data: {
							weight: Number(weight),
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
								label="Weight"
								margin="dense"
								variant="outlined"
								onChange={(e) => this.setState({ weight: e.target.value })}
								value={this.state.weight}
								endAdornment={<InputAdornment position="end">kg</InputAdornment>}
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
							<Button color="secondary" aria-label="Add" variant="raised" type="submit" className={classes.fab}>
								ADD
							</Button>
						</div>
					</form>
				</FormGroup>
			</MuiPickersUtilsProvider>
		);
	}
}

AddWeightRecord.propTypes = {
	classes: PropTypes.object.isRequired
};

const AddWeightRecordMutation = graphql(ADD_WEIGHT)(AddWeightRecord);
export default withStyles(styles)(AddWeightRecordMutation);
