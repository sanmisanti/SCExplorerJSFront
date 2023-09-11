import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getAllClases = async () => {
	const request = axios.get(baseUrl + '/getAllClases');
	return await request.then(response => response.data);
};

const getClasesFilter = async filtro => {
	const url = encodeURI(baseUrl + '/getClasesFilter/' + filtro);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

export default { getAllClases, getClasesFilter };
