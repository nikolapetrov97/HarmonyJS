import { combineReducers, Reducer } from 'redux';
import { fork, all } from 'redux-saga/effects';
import baseReducers, { BaseApplicationState } from '@base/features/base-reducers';

/* ------------- Import States ------------- */
import { CatalogState } from 'actions/catalog/interface';
import { CartState } from 'actions/cart/interface';
import { WeatherState } from 'actions/weather/interface'
/* ------------- Import Sagas ------------- */
import { catalogSaga } from 'actions/catalog';
import { flowManagerSaga } from 'actions/flowManager';
import { weatherSaga } from 'actions/weather';
import makeCart from '@base/features/base-cart';

const baseCartReducer = makeCart('cart').reducer;

/* ------------- Define ApplicationState ------------- */
export interface ApplicationState extends BaseApplicationState {
	cart: CartState;
	weather: WeatherState;
	catalog: CatalogState;
}

/* ------------- Export Reducers ------------- */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	...baseReducers,

	cart: require('./cart').reducer(baseCartReducer),
	weather: require('./weather').reducer,
	catalog: require('./catalog').reducer
});

/* ------------- Export Sagas ------------- */
export const rootSaga = function* () {
	yield all([fork(flowManagerSaga)]);
	yield all([fork(require('./cart').cartSaga)]);
	yield all([fork(catalogSaga)]);
	yield all([fork(weatherSaga)]);
};
