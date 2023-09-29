import axios from 'axios';

const baseUrl = 'http://localhost:3000/getOgDetalles';

const getAllogDetalle = async () => {
	const request = axios.get(baseUrl);
	return await request.then(response => response.data);
};

export default { getAllogDetalle };
