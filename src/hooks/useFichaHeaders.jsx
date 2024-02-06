import { useReducer } from 'react';
import { getClaseByClasCod } from '../services/claseService.jsx';

// Aca voy a a devolver 3 datos la Clase, la Ficha y los handlers
const originalState = {
	fichaHeaders: {
		claseCod: null,
		descripcion: null,
		propiedades: [],
		loading: false,
		error: false,
	},
};

const acciones = {
	SET_FICHA_HEADERS: 'setFichaHeaders',
	SET_LOADING: 'setLoading',
	SET_ERROR: 'setError',
	RESET: 'reset',
};

const ACTIONS_REDUCERS = {
	[acciones.SET_FICHA_HEADERS]: (state, action) => {
		const { fichaHeaders } = action.payload;
		return {
			...state,
			fichaHeaders: {
				...fichaHeaders,
				loading: false,
				error: false,
			},
		};
	},
	[acciones.SET_LOADING]: (state, action) => {
		const { target, value } = action.payload.loading;
		return {
			...state,
			[target]: {
				...state[target],
				loading: value,
			},
		};
	},
	[acciones.RESET]: (state, action) => {
		const { target } = action.payload;
		return {
			...state,
			[target]: {
				...originalState[target],
			},
		};
	},
	[acciones.SET_ERROR]: (state, action) => {
		const { target, value } = action.payload.error;
		return {
			...state,
			[target]: {
				...originalState[target],
				error: value,
				loading: false,
			},
		};
	},
};
const reducer = (state, action) => {
	const actionReducer = ACTIONS_REDUCERS[action.type];
	return actionReducer ? actionReducer(state, action) : state;
};

export const useFichaHeaders = () => {
	const [fichaFiltrosHeadersValues, dispatch] = useReducer(
		reducer,
		originalState
	);

	const getFichaClaseHeaders = async fichaHeaders => {
		if (fichaHeaders == '') {
			dispatch({
				type: acciones.SET_ERROR,
				payload: { error: { target: 'fichaHeaders', value: false } },
			});
			return;
		}
		dispatch({
			type: acciones.SET_LOADING,
			payload: { loading: { target: 'fichaHeaders', value: true } },
		});
		/* set timeout */
		let data;

		try {
			data = await getClaseByClasCod(fichaHeaders);
		} catch (error) {
			alert(error);
		}
		if (!data) {
			dispatch({
				type: acciones.SET_ERROR,
				payload: { error: { target: 'fichaHeaders', value: true } },
			});
			return;
		}

		dispatch({
			type: acciones.SET_FICHA_HEADERS,
			payload: { fichaHeaders: data },
		});
	};

	return {
		fichaFiltrosHeadersValues,
		getFichaClaseHeaders,
	};
};
