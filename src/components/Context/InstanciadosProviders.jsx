import { createContext } from 'react';
import { useFormStates } from '../../hooks/useFormStates';
import { useFichaHeaders } from '../../hooks/useFichaHeaders';
import { useFichaValues } from '../../hooks/useFichaValues';
import { useInstanciadosResult } from '../../hooks/useInstanciadosResult';
export const InstanciadosContext = createContext();

export const InstanciadosProvider = ({ children }) => {
	const { fichaFiltrosHeadersValues, getFichaClaseHeaders } = useFichaHeaders();
	const { formFiltrosValues, handlersFormChange, getFiltosValues } =
		useFormStates();
	const { fichaFiltrosValues, filtrosValuesChangeHandlers } = useFichaValues();
	const { instanciadosResult, getInstanciadosByFicha, getInstanciadosByForm } =
		useInstanciadosResult();

	const getInstanciados = {
		pageChange: move => {
			getInstanciadosByForm({
				formData: getFiltosValues.selected(),
				move,
				newPageSize: null,
			});
		},
		pageChangeSize: size => {
			getInstanciadosByForm({
				formData: getFiltosValues.selected(),
				move: null,
				newPageSize: size,
			});
		},
		form: () => {
			getInstanciadosByForm({
				formData: getFiltosValues.selected(),
				move: null,
				newPageSize: null,
			});
		},
	};

	return (
		<InstanciadosContext.Provider
			value={{
				formFiltrosValues,
				handlersFormChange,
				fichaFiltrosHeadersValues,
				getFichaClaseHeaders,
				fichaFiltrosValues,
				getFiltosValues,
				filtrosValuesChangeHandlers,
				instanciadosResult,
				getInstanciadosByFicha,
				getInstanciados,
			}}
		>
			{children}
		</InstanciadosContext.Provider>
	);
};
