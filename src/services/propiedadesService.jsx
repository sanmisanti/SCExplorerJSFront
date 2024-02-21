import axios from 'axios';

const baseUrl = 'http://192.168.49.13:3000';

const getAllPropiedades = async () => {
	const request = axios.get(baseUrl + '/getAllPropiedades');
	return await request.then(response => response.data);
};

export default { getAllPropiedades };
