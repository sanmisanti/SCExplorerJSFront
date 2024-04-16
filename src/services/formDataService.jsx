import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_BASE_URL_BACKEND}getAllFormData`

export const getFormData = async () => {
	const request = axios.get(baseUrl);
	return await request.then(response => response.data);
};
