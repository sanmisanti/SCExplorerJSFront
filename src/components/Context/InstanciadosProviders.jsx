import { createContext } from 'react';
import { useFormStates } from '../../hooks/useFormStates';
import { useFichaHeaders } from '../../hooks/useFichaHeaders';
import { useFichaValues } from '../../hooks/useFichaValues';
import { useInstanciadosResult } from '../../hooks/useInstanciadosResult';
export const InstanciadosContext = createContext();

export const InstanciadosProvider = ({ children }) => {
	const { fichaFiltrosHeadersValues, getFichaClaseHeaders } = useFichaHeaders();
	const { formFiltrosValues, handlersFormChange } = useFormStates();
	const { fichaFiltrosValues, filtrosValuesChangeHandlers } = useFichaValues();
	const { instanciadosResult, getInstanciadosByFicha, handlePage } =
		useInstanciadosResult();
	return (
		<InstanciadosContext.Provider
			value={{
				formFiltrosValues,
				handlersFormChange,
				fichaFiltrosHeadersValues,
				getFichaClaseHeaders,
				fichaFiltrosValues,
				filtrosValuesChangeHandlers,
				instanciadosResult,
				getInstanciadosByFicha,
				handlePage,
			}}
		>
			{children}
		</InstanciadosContext.Provider>
	);
};
