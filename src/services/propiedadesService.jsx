import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getAllPropiedades = async () => {
	const request = axios.get(baseUrl + '/getAllPropiedades');
	return await request.then(response => response.data);
};

export default { getAllPropiedades };
