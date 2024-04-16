import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL_BACKEND;

export const getAllClases = async page => {
	const url = baseUrl + `/getAllClases/${page.toString()}`;
	const request = axios.get(url);
	return await request.then(response => response.data);
};

export const getClasesFilter = async filtro => {
	const url = encodeURI(baseUrl + '/getClasesFilter/' + filtro);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

export const getClaseByClasCod = async claseCod => {
	const url = encodeURI(baseUrl + '/getClaseByClasCod/' + claseCod);
	const request = axios.get(url);
	const res = await request.then(response => response.data);
	return res;
};
