import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL_BACKEND;

const getAllPropiedades = async () => {
	const request = axios.get(baseUrl + '/getAllPropiedades');
	return await request.then(response => response.data);
};

export default { getAllPropiedades };
