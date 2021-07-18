import { Store } from '@base/features';
import { weatherSelector } from 'actions/weather';

export const goToPageOne = async () => {
	const city = weatherSelector.selectCity(Store.getState());

	if (city === 'Sofia') {
		return Promise.resolve();
	}

	return Promise.reject();
};

export const goToPageTwo = async () => {
	const city = weatherSelector.selectCity(Store.getState());

	if (city === 'Plovdiv') {
		return Promise.resolve();
	}

	return Promise.reject();
};
