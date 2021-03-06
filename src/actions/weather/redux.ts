import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	WeatherState, TypesNames, ActionCreator, SetTempAction, MySagaAction
} from './interface';
// import { debug } from 'webpack';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	mySaga: ['city'], // handle by saga
	setTemp: ['temp']
});

export const WeatherTypes = TypesNames;
export const WeatherActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<WeatherState>({
	temp: '',
	city: ''
});

/* ------------- Selectors ------------- */

export const weatherSelector = {
	selectTemp: (state: ApplicationState) => state.weather.temp,
	selectCity: (state: ApplicationState) => state.weather.city
};

/* ------------- Reducers ------------- */

const setTempReducer = (draft: Draft<WeatherState>, action: SetTempAction) => {
	const { temp } = action;
	draft.temp = temp;
};

const mySagaReducer = (draft: Draft<WeatherState>, action: MySagaAction) => {
	const { city } = action;
	draft.city = city;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.SET_TEMP]: createReducerCase(setTempReducer),
	[TypesNames.MY_SAGA]: createReducerCase(mySagaReducer)
});
