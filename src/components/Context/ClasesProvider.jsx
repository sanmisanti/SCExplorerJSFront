import { createContext, useState, useEffect } from 'react';
import claseService from '../../services/claseService';
import PropTypes from 'prop-types';

// Crea un contexto
export const ClasesContext = createContext();

// Proporciona un proveedor de contexto que envuelve tu aplicación
export const ClasesProvider = ({ children }) => {
	const [clasesToShow, setClasesToShow] = useState([]);
	const [pickedClaseCod, setPickedClaseCod] = useState(null);
	const [modoInsercion, setModoInsercion] = useState(false);

	const handleSetClasesToShow = data => {
		setClasesToShow(data);
	};
	const handlePickClase = cod => {
		setPickedClaseCod(cod);
	};

	const handleChangeMode = () => {
		setModoInsercion(!modoInsercion);
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

	const pickedClase = {
		cod: pickedClaseCod,
		handler: handlePickClase,
	};

	return (
		<ClasesContext.Provider
			value={{
				clasesToShow,
				handleSetClasesToShow,
				pickedClase,
				modoInsercion,
				handleChangeMode,
			}}
		>
			{children}
		</ClasesContext.Provider>
	);
};

ClasesProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

/* export default { ClasesProvider, ClasesContext }; */

/* export default ClasesContext; */
