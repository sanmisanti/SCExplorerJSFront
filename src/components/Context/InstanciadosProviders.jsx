import { createContext } from 'react';
import { useFormStates } from '../../hooks/useFormStates';
import { useFichaHeaders } from '../../hooks/useFichaHeaders';
import { useFichaValues } from '../../hooks/useFichaValues';
export const InstanciadosContext = createContext();

export const InstanciadosProvider = ({ children }) => {
	const { fichaFiltrosHeadersValues, getFichaClaseHeaders } = useFichaHeaders();
	const { formFiltrosValues, handlersFormChange } = useFormStates();
	const { fichaFiltrosValues, filtrosValuesChangeHandlers } = useFichaValues();
	return (
		<InstanciadosContext.Provider
			value={{
				formFiltrosValues,
				handlersFormChange,
				fichaFiltrosHeadersValues,
				getFichaClaseHeaders,
				fichaFiltrosValues,
				filtrosValuesChangeHandlers,
			}}
		>
			{children}
		</InstanciadosContext.Provider>
	);
};
