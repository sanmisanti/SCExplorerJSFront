import axios from 'axios';

const baseUrl = 'http://127.0.0.1:3000/';

const getInstanciadosByClaseCod = async claseCod => {
	const url = encodeURI(baseUrl + '/getInstanciadosByClase/' + claseCod);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

const getFichaByClaseCod = async claseCod => {
	const url = encodeURI(baseUrl + '/getFichaByClase/' + claseCod);
	const request = axios.get(url);
	return await request.then(response => response.data);
};

export default { getInstanciadosByClaseCod, getFichaByClaseCod };
