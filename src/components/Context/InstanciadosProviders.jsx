import { createContext } from 'react';
import { useFormStates } from '../../hooks/useFormStates';
import { useFichaData } from '../../hooks/useFichaData';
export const InstanciadosContext = createContext();

export const InstanciadosProvider = ({ children }) => {
	const { fichaFiltrosValues, getFichaClaseHeaders } = useFichaData();
	const { formFiltrosValues, handlersFormChange } = useFormStates();

	return (
		<InstanciadosContext.Provider
			value={{
				formFiltrosValues,
				handlersFormChange,
				fichaFiltrosValues,
				getFichaClaseHeaders,
			}}
		>
			{children}
		</InstanciadosContext.Provider>
	);
};
