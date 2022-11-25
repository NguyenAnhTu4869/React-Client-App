import { getIamBaseUrl } from './helper/getBaseUrl';
import axios from 'axios';

export const createOrUpdateUser = async (accessToken) => {
	return axios.post(
		getIamBaseUrl('/user'),
		{},
		{
			headers: {
				accessToken,
			},
		}
	);
};

export const checkCurrentUser = async (accessToken) => {
	return axios.post(
		getIamBaseUrl('/check-user'),
		{},
		{
			headers: {
				accessToken,
			},
		}
	);
};

export const checkCurrentAdmin = async (accessToken) => {
	return axios.post(
		getIamBaseUrl('/check-admin'),
		{},
		{
			headers: {
				accessToken,
			},
		}
	);
};
