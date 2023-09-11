import { createContext, useState, useEffect } from 'react';
import claseService from '../../services/claseService';
import PropTypes from 'prop-types';

// Crea un contexto
export const ClasesContext = createContext();

// Proporciona un proveedor de contexto que envuelve tu aplicación
export const ClasesProvider = ({ children }) => {
	const [clasesToShow, setClasesToShow] = useState([]);

	const handleSetClasesToShow = data => {
		setClasesToShow(data);
	};

	useEffect(() => {
		claseService
			.getAllClases()
			.then(initialClases => {
				setClasesToShow(initialClases);
				/* console.log('initialClases', initialClases); */
			})
			.catch(error => {
				alert(error);
			});
	}, []);

	return (
		<ClasesContext.Provider value={{ clasesToShow, handleSetClasesToShow }}>
			{children}
		</ClasesContext.Provider>
	);
};

ClasesProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

/* export default { ClasesProvider, ClasesContext }; */

/* export default ClasesContext; */
