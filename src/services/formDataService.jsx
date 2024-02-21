import axios from 'axios';

const baseUrl = 'http://192.168.49.13:3000/getAllFormData';

export const getFormData = async () => {
	const request = axios.get(baseUrl);
	return await request.then(response => response.data);
};
