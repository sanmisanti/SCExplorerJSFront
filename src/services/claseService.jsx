import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getAllClases = async page => {
	console.log('page,', page);
	const url = baseUrl + `/getAllClases/${page.toString()}`;
	console.log('URL', url);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

const getClasesFilter = async filtro => {
	const url = encodeURI(baseUrl + '/getClasesFilter/' + filtro);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

export default { getAllClases, getClasesFilter };
