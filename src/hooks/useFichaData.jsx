import { useReducer } from 'react';
import { getClaseByClasCod } from '../services/claseService.jsx';

// Aca voy a a devolver 3 datos la Clase, la Ficha y los handlers
const originalState = {
	objClase: {
		claseCod: null,
		descripcion: null,
		propiedades: [],
		loading: false,
		error: false,
	},
};

const acciones = {
	SET_OBJ_CLASE: 'setObjClase',
	SET_LOADING: 'setLoading',
	SET_ERROR: 'setError',
	RESET: 'reset',
};

const ACTIONS_REDUCERS = {
	[acciones.SET_OBJ_CLASE]: (state, action) => {
		const { objClase } = action.payload;
		return {
			...state,
			objClase: {
				...objClase,
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
			},
		};
	},
};
const reducer = (state, action) => {
	const actionReducer = ACTIONS_REDUCERS[action.type];
	return actionReducer ? actionReducer(state, action) : state;
};

export const useFichaData = () => {
	const [fichaFiltrosValues, dispatch] = useReducer(reducer, originalState);

	const getFichaClaseHeaders = async claseCod => {
		if (claseCod == '') {
			dispatch({
				type: acciones.SET_ERROR,
				payload: { error: { target: 'objClase', value: false } },
			});
			return;
		}
		dispatch({
			type: acciones.SET_LOADING,
			payload: { loading: { target: 'objClase', value: true } },
		});

		const data = await getClaseByClasCod(claseCod);

		if (!data) {
			dispatch({
				type: acciones.SET_ERROR,
				payload: { error: { target: 'objClase', value: true } },
			});
			return;
		}

		dispatch({
			type: acciones.SET_OBJ_CLASE,
			payload: { objClase: data },
		});
	};

	return {
		fichaFiltrosValues,
		getFichaClaseHeaders,
	};
};
