import React from 'react';
// import { NoSSR } from 'next';
import NoSSR from 'react-no-ssr';
import Spinner from '../Common/Spinner';
import '../../static/styles/app.scss';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { withApollo } from 'react-apollo';
import WEIGHT from '../../api/Weight';
import InfoCard from './InfoCard';
import Chart from './Chart';
import { sumArrayByProperty } from '../../utils/helpers';
import Modal from '../Common/Modal';
import RecordsMutations from './RecordsMutations';
import { getFatPercentAvg, usNavyMethod, baileyMethod } from './utils/helpers';
import CIRCUMFERENCE from '../../api/Circumference';
import Table from '../Table/Table';
import { getISOWeek, parseISO } from 'date-fns';
import format from 'date-fns/format';
import dynamic from 'next/dynamic'
const ApexNoSSR = dynamic(import('./ApexChart'), {
	ssr: false
})
export const DashboardContext = React.createContext();

class Dashboard extends React.Component {
	static pageTransitionDelayEnter = true;

	constructor(props) {
		super(props);
		this.state = {
			weight: [],
			circumference: [],
			averagesByWeek: [],
			currentWeight: 0,
			modal: false
		};
	}

	componentDidMount() {
		this.getWeightData();
		this.getCircumferenceData();
	}

	startLoading = () => {
		this.setState(() => ({ loading: true }));
	};
	stopLoading = () => {
		this.setState(() => ({ loading: false }));
	};

	getWeightData = async () => {
		this.startLoading();
		await this.props.client
			.query({
				query: WEIGHT
			})
			.then((result) => {
				let weight = result.data.weight;
				this.stopLoading();
				this.setState({ weight });
				this.prepareWeight(weight);
				return;
			})
			.catch((e) => console.error(e));
	};
	getCircumferenceData = async () => {
		this.startLoading();
		await this.props.client
			.query({
				query: CIRCUMFERENCE
			})
			.then((result) => {
				let circumference = result.data.circumference;
				this.updateCircumference(circumference);
				this.setState({ circumference });
				this.stopLoading();
				return;
			})
			.catch((error) => this.setState({ error }));
	};

	updateCircumference = (circumference) => {
		const abdomen = circumference[circumference.length - 1].abdomen;
		const hips = circumference[circumference.length - 1].hips;
		const forearm = circumference[circumference.length - 1].forearm;
		const wrist = circumference[circumference.length - 1].wrist;
		const neck = circumference[circumference.length - 1].neck;
		const myHeight = 1.79;
		const bmi = (this.state.currentWeight / Math.pow(myHeight, 2)).toFixed(2);
		const fat = getFatPercentAvg(abdomen, hips, forearm, wrist, neck, myHeight);
		const leanBodyWeight = (this.state.currentWeight * ((100 - fat) / 100)).toFixed(1);
		const fatBodyWeight = (this.state.currentWeight * (fat / 100)).toFixed(1);
		this.setState({ bmi, fat, leanBodyWeight, fatBodyWeight });

		console.log(usNavyMethod(abdomen, neck, myHeight));
		console.log(baileyMethod(abdomen, hips, forearm, wrist));
	};

	prepareWeight = (weight) => {
		const getAverageWeight = (arr) => (sumArrayByProperty('weight', arr) / arr.length).toFixed(1);

		const groupByWeek = weight.reduce((outcome, record) => {
			// let yearWeek = record.createdAt;
			let yearWeek = getISOWeek(parseISO(record.createdAt));
			let year = new Date(parseISO(record.createdAt)).getFullYear();
			let index = `${year}-${yearWeek}`;
			if (typeof outcome[index] === 'undefined') {
				outcome[index] = [];
			}
			outcome[index].push(record);
			return outcome;
		}, {});

		let averagesByWeek = [];

		Object.entries(groupByWeek).forEach(([ key, value ]) => {
			let object = {
				weight: getAverageWeight(value),
				date: key
			};
			averagesByWeek.push(object);
		});

		console.log(averagesByWeek);
		let currentWeight = averagesByWeek[averagesByWeek.length - 1].weight;

		this.setState(() => ({ currentWeight, averagesByWeek }));
	};
	toggleModal = () => {
		this.setState(() => ({ modal: !this.state.modal }));
	};

	render() {
		const width = 200;
		const height = 150;
		return (
			<DashboardContext.Provider
				value={{
					state: this.state
				}}
			>
				<div className="dashboard">
					<Fab
						className="dashboard--add-button"
						variant="raised"
						color="primary"
						aria-label="Add"
						type="submit"
						onClick={this.toggleModal}
					>
						<Add />
					</Fab>
					{this.state.loading ? (
						<Spinner />
					) : (
						<React.Fragment>
							<div>
								<Chart
									data={this.state.weight.map((entity) => ({
										Weight: entity.weight,
										Date: format(parseISO(entity.createdAt), `dd.MM`)
									}))}
									dataKeyX={`Date`}
									domain={{ Y: [ 'dataMin - 1', 'dataMax + 1' ] }}
									interval={{ Y: `preserveStartEnd` }}
									lineType="monotone"
									lineDataKey="Weight"
									lineDataKey2="weight"
									lineStroke="#82ca9d"
								/>
								<Chart
									data={this.state.averagesByWeek}
									dataKeyX={`date`}
									domain={{ Y: [ 'dataMin - 1', 'dataMax + 1' ] }}
									interval={{ Y: `preserveStartEnd` }}
									lineType="monotone"
									lineDataKey="weight"
									lineStroke="#187bcd"
								/>
								<ApexNoSSR/>
							</div>
							<div className="dashboard--info-cards">
								<InfoCard value={this.state.currentWeight} unit={`kg`} title={`Weight`} width={width} />
								<InfoCard value={this.state.bmi} unit={``} title={`BMI`} width={width} />
								<InfoCard value={this.state.fat} unit={`%`} title={`Body Fat`} width={width} />
								<InfoCard
									value={this.state.fatBodyWeight}
									unit={`kg`}
									title={`Fat body weight`}
									width={width}
								/>
								<InfoCard
									value={this.state.leanBodyWeight}
									unit={`kg`}
									title={`Lean body weight`}
									width={width}
								/>
							</div>
							<Table
								data={this.state.circumference}
								propName1="neck"
								colName1="Neck"
								propName2="forearm"
								colName2="Forearm"
								propName3={'waist'}
								propName4={'abdomen'}
								propName5={'hips'}
								propName6={'thigh'}
								propName7={'calf'}
								propName8={'wrist'}
								colName3={'Waist'}
								colName4={'Abdomen'}
								colName5={'Hips'}
								colName6={'Thigh'}
								colName7={'Calf'}
								colName8={'Wrist'}
								width={'40vw'}
								height={200}
								color={'#ffffff'}
							/>
							<Table
								data={this.state.weight}
								propName1="weight"
								colName1="Weight"
								propName2="createdAt"
								colName2="CreatedAt"
								width={'40vw'}
								height={200}
								color={'#ffffff'}
							/>
						</React.Fragment>
					)}

					<Modal
						title={`Add records`}
						open={this.state.modal}
						handleClose={this.toggleModal}
						component={<RecordsMutations />}
					/>
				</div>
			</DashboardContext.Provider>
		);
	}
}

export default withApollo(Dashboard);
