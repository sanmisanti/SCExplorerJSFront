import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL_BACKEND;

const getAllRubros = async () => {
	const request = axios.get(baseUrl + '/rubrosEconomicos/getAllRubros');
	return await request.then(response => response.data);
};

export default { getAllRubros };
