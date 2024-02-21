import axios from 'axios';

const baseUrl = 'http://192.168.49.13:3000/getAllCategorias';

const getAllCategorias = async () => {
	const request = axios.get(baseUrl);
	return await request.then(response => response.data);
};

export default { getAllCategorias };
