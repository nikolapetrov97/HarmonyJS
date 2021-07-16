import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/weather/sagas';
import { WeatherTypes } from 'actions/weather';

/* ------------- Export Redux ------------- */
export * from 'actions/weather/redux';

/* ------------- Export Sagas ------------- */
function* watchMySaga() {
	yield takeLatest(WeatherTypes.MY_SAGA, createSaga(Sagas.mySaga));
}

// TODO: Do Not Forget to Add your new saga to index file
export function* weatherSaga() {
	yield all([
		fork(watchMySaga)
	]);
}
