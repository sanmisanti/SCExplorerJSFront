import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL_BACKEND

console.log(baseUrl)

export const getInstanciadosByClaseCod = async claseCod => {
	const url = encodeURI(baseUrl + 'getInstanciadosByClase/' + claseCod);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

export const getFichaByClaseCod = async claseCod => {
	const url = encodeURI(baseUrl + 'getFichaByClase/' + claseCod);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

export const getInstanciadosByFichaService = async (
	codigoClase,
	codigosItems
) => {
	const url = encodeURI(baseUrl + 'getInstanciadosByFicha');
	const request = axios.post(url, { codigoClase, codigosItems });
	return await request.then(response => response.data);
};

export const getInstanciadosByFormService = async data => {
	const url = encodeURI(baseUrl + 'getInstanciadosByForm');
	const request = axios.post(url, data);
	return await request.then(response => response.data);
};
