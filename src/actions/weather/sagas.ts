import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { WeatherActions } from 'actions/weather';
import { MySagaAction } from 'actions/weather/interface';
import { startFlow } from 'actions/flowManager/sagas';
import { TypesNames } from 'actions/flowManager/interface';
import FlowManagerConfig from 'public/config/flow-manager/types.json';

const { flowTypes, stepTypes } = FlowManagerConfig;

export function* mySaga(action: MySagaAction) {
	yield call(startFlow, {
		type: TypesNames.START_FLOW,
		flowType: flowTypes.COP,
		currentStep: stepTypes.MY_PAGE.name,
	});
	const { city } = action;
	const response: AxiosResponse = yield call(api.getTemp, city);
	yield put(WeatherActions.setTemp(response.data.current.temp_c));
}
