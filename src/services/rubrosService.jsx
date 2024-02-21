import axios from 'axios';

const baseUrl = 'http://192.168.49.13:3000';

const getAllRubros = async () => {
	const request = axios.get(baseUrl + '/rubrosEconomicos/getAllRubros');
	return await request.then(response => response.data);
};

export default { getAllRubros };
