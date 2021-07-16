import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface WeatherState {
	temp: string
	city: string
}

export enum TypesNames {
	SET_TEMP = 'SET_TEMP',
	MY_SAGA = 'MY_SAGA'
}

export declare function SetTempFunction(temp: string): SetTempAction;
export declare function MySagaFunction(city: string): MySagaAction;

export interface ActionCreator {
	setTemp: typeof SetTempFunction;
	mySaga: typeof MySagaFunction;
}

export interface SetTempAction extends Action<TypesNames.SET_TEMP> {
	temp: string
}

export interface MySagaAction extends Action<TypesNames.MY_SAGA> {
	city: string
}

/* ------------- Define Any Interfaces ------------- */
export interface MySagaInterface {
	city: string;
}
