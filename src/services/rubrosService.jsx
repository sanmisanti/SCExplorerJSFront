import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getAllRubros = async () => {
	const request = axios.get(baseUrl + '/rubrosEconomicos/getAllRubros');
	return await request.then(response => response.data);
};

export default { getAllRubros };
