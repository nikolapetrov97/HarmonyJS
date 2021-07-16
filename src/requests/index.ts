/**
 * Here you add all the apis urls defenition
 */

import request from '@base/features/base-api';
import { AxiosResponse } from 'axios';
import { config } from 'config';
import GenericMobileImage from 'public/assets/images/generic-mobile.jpg';
import responseExample from './mocks/response_example.json';
import { Device } from 'actions/catalog/interface';

export interface Api {
	getDevices: () => Promise<AxiosResponse>;
	getDevicesMock: () => any;
	getTemp: (city: String) => any;
}

export const createApi = (baseURL = config.ROOT_SERVER_URL): Api => ({
	getDevices: () => request.call({
		baseURL: 'http://6ew7g.mocklab.io/' || baseURL,
		method: 'get',
		url: '/getlatestWithCustomResponseCode'
	}),
	getDevicesMock: () => {
		const genericImage = GenericMobileImage;

		const mock = (responseExample as Device[]).map((item) => {
			const temp = { ...item };
			temp.image = genericImage;
			return temp;
		});

		return {
			status: 200,
			data: mock
		};
	},
	getTemp: (city) => request.call({
		baseURL: 'http://api.weatherapi.com/',
		method: 'get',
		url: `/v1/current.json?key=96049cd709454de681c71335211607&q=${city}`
	})
});

export default createApi();
