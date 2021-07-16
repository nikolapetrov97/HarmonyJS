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
import { MoveToNextStepFunction } from 'actions/flowManager/interface';
import { FlowManagerActions } from 'actions/flowManager';


type Props = InjectedFormProps;

interface State {
	changeValue: string
}

export interface OwnProps extends Props {
	formValues: any;
	mySaga: typeof MySagaFunction;
	temperat: {};
	cityy: string
	moveToNextStep: typeof MoveToNextStepFunction;
}

class MyPage extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			changeValue: ''
		};
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
					<button type="submit" disabled={submitting} onClick={() => {
						let { moveToNextStep } = this.props
						moveToNextStep()
					}}>
						Submit
					</button>
				</div>
			</form>
		);
	}

	handleSubmit() {
		// let { moveToNextStep } = this.props
		// moveToNextStep()
	}
}

export default baseConnectForm(MyPage,
	(state: ApplicationState) => ({
		temperat: weatherSelector.selectTemp(state),
		cityy: weatherSelector.selectCity(state),
		formValues: getFormValues("FormExampleForm")(state)
	}),
	(dispatch: Dispatch) => ({
		mySaga: (city: string) => dispatch(WeatherActions.mySaga(city)),
		moveToNextStep: (step?: string) => dispatch(FlowManagerActions.moveToNextStep(step))
	}),
	{
		form: 'FormExampleForm'
	});
