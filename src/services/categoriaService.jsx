import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_BASE_URL_BACKEND}getAllCategorias`

const getAllCategorias = async () => {
	const request = axios.get(baseUrl);
	return await request.then(response => response.data);
};

export default { getAllCategorias };
