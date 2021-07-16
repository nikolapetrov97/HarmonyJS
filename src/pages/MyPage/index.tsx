import * as React from 'react';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { InjectedFormProps, getFormValues } from 'redux-form';
import {
	required
} from 'utils/validations';
import { FieldAutocomplete } from 'common-components/controllers';
import { ApplicationState } from 'actions';
import { WeatherActions, weatherSelector } from 'actions/weather';
import { Dispatch } from 'redux';
import { MySagaFunction } from 'actions/weather/interface';

type Props = InjectedFormProps;

interface State {
	changeValue: string
}

export interface OwnProps extends Props {
	formValues: any;
	mySaga: typeof MySagaFunction;
	temperat: {};
}

class MyPage extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			changeValue: ''
		};
	}
	// API_KEY = '96049cd709454de681c71335211607'
	// getWeather = async () => {
	// 	let currentCity = this.props.formValues;
	// 	let weather: any = {}
	// 	let temp = ''

	// 	if (currentCity != undefined) {
	// 		(async () => {
	// 			const response = await fetch(
	// 				`http://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${currentCity.cities.title}`)
	// 			weather = await response.json()
	// 			temp = weather.current.temp_c
	// 			// this.setState({ temp })
	// 		})()
	// 	}
	// }

	componentDidUpdate() {

	}

	render() {
		const {
			handleSubmit, submitting, temperat
		} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
				<br /><br />
				<FieldAutocomplete
					name="cities"
					type="text"
					label="cities"
					onChange={(e: any) => {
						setTimeout(() => {
							let { mySaga: mySaga, formValues } = this.props
							// debugger
							let city = formValues != undefined ? formValues.cities.title : undefined
							if (city == undefined) { debugger }
							mySaga(city)
							this.setState({ changeValue: e?.target.value })
						}, 500);
					}}
					validate={required}
				/>
				<h1>{temperat != '' ? `Current temperature: ${temperat}C` : null}</h1>
				<div>
					<button type="submit" disabled={submitting}>
						Submit
					</button>
				</div>
			</form>
		);
	}

	handleSubmit() {
		// let currentCity = this.props.formValues;
		// console.log(currentCity, "city");
	}
}

export default baseConnectForm(MyPage,
	(state: ApplicationState) => ({
		temperat: weatherSelector.selectTemp(state),
		formValues: getFormValues("FormExampleForm")(state)
	}),
	(dispatch: Dispatch) => ({
		mySaga: (city: string) => dispatch(WeatherActions.mySaga(city)),
	}),
	{
		form: 'FormExampleForm'
	});
