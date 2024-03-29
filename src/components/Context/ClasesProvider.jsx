import { createContext, useState, useCallback } from 'react';

import PropTypes from 'prop-types';
import { useFormStates } from '../../hooks/useFormStates';

// Crea un contexto
export const ClasesContext = createContext();

// Proporciona un proveedor de contexto que envuelve tu aplicación
export const ClasesProvider = ({ children }) => {
	const { formFiltrosValues, handlersFormChange } = useFormStates();

	const [clasesToShow, setClasesToShow] = useState([]);

	const [modoInsercion, setModoInsercion] = useState(false);
	const [page, setPage] = useState(1);

	const handleSetClasesToShow = useCallback(
		data => {
			setClasesToShow(data);
		},
		[setClasesToShow]
	);

	const handleSetPage = useCallback(
		newPage => {
			setPage(newPage);
		},
		[setPage]
	);

	const handleChangeMode = () => {
		setModoInsercion(!modoInsercion);
	};

	return (
		<ClasesContext.Provider
			value={{
				clasesToShow,
				handleSetClasesToShow,
				modoInsercion,
				handleChangeMode,
				handleSetPage,
				page,
				formFiltrosValues,
				handlersFormChange,
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
