import { createContext } from 'react';
import { useFormStates } from '../../hooks/useFormStates';
import { useFichaData } from '../../hooks/useFichaData';
export const InstanciadosContext = createContext();

export const InstanciadosProvider = ({ children }) => {
	const { fichaFiltrosValues, fichaHandlers } = useFichaData();
	const { formFiltrosValues, handlersFormChange } = useFormStates();

	return (
		<InstanciadosContext.Provider
			value={{
				formFiltrosValues,
				handlersFormChange,
				fichaFiltrosValues,
				fichaHandlers,
			}}
		>
			{children}
		</InstanciadosContext.Provider>
	);
};
