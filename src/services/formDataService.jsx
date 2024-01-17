import axios from 'axios';

const baseUrl = 'http://localhost:3000/getAllFormData';

export const getFormData = async () => {
	const request = axios.get(baseUrl);
	return await request.then(response => response.data);
};
