import { useReducer } from 'react';
import {
	getInstanciadosByFichaService,
	getInstanciadosByFormService,
} from '../services/instanciasService.jsx';

const INSTANCIADOSRESULT_INITIAL_STATE = {
	itemsInstanciados: [],
	loading: false,
	pageSize: 10,
	currentPage: 1,
	totalItems: 0,
	totalPages: 0,
};

const INSTANCIADOSRESULT_ACTIONS = {
	SET_INSTANCIADOS_RESULT: 'SET_INSTANCIADOS_RESULT',
	SET_LOADING: 'SET_LOADING',
	SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
	SET_PAGE_SIZE: 'SET_PAGE_SIZE',
};

const INSTANCIADOSRESULT_REDUCERS = {
	[INSTANCIADOSRESULT_ACTIONS.SET_INSTANCIADOS_RESULT]: (
		state,
		{ payload }
	) => ({
		...state,
		itemsInstanciados: payload.rows || [],
		totalItems: payload.count || 0,
		totalPages: Math.ceil(payload.count / state.pageSize),
		currentPage: payload.currentPage || 1,
		loading: false,
	}),
	[INSTANCIADOSRESULT_ACTIONS.SET_LOADING]: (state, action) => ({
		...state,
		loading: action.payload,
	}),
	[INSTANCIADOSRESULT_ACTIONS.SET_CURRENT_PAGE]: (state, action) => {
		const move = action.payload;
		let currentPage = state.currentPage;
		if (typeof move === 'number') {
			currentPage = move;
		} else if (move === 'next') {
			currentPage++;
		} else if (move === 'prev') {
			currentPage--;
		}

		return {
			...state,
			currentPage: currentPage,
		};
	},
	[INSTANCIADOSRESULT_ACTIONS.SET_PAGE_SIZE]: (state, action) => ({
		...state,
		pageSize: action.payload,
	}),
};

const reducer = (state, action) => {
	const actionReducer = INSTANCIADOSRESULT_REDUCERS[action.type];
	return actionReducer ? actionReducer(state, action) : state;
};

export const useInstanciadosResult = () => {
	const [instanciadosResult, dispatch] = useReducer(
		reducer,
		INSTANCIADOSRESULT_INITIAL_STATE
	);

	const getInstanciadosByFicha = async (codigoClase, codigosItems) => {
		try {
			dispatch({
				type: INSTANCIADOSRESULT_ACTIONS.SET_LOADING,
				payload: true,
			});
			const instanciados = await getInstanciadosByFichaService(
				codigoClase,
				codigosItems
			);
			dispatch({
				type: INSTANCIADOSRESULT_ACTIONS.SET_INSTANCIADOS_RESULT,
				payload: instanciados,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const getInstanciadosByForm = async (formData, move) => {
		try {
			dispatch({
				type: INSTANCIADOSRESULT_ACTIONS.SET_LOADING,
				payload: true,
			});
			let currentPage = instanciadosResult.currentPage;

			if (typeof move === 'number') {
				currentPage = move;
			} else if (move === 'next') {
				currentPage++;
			} else if (move === 'prev') {
				currentPage--;
			} else if (!move) {
				currentPage = 1;
			}
			const payload = {
				...formData,
				currentPage,
				pageSize: instanciadosResult.pageSize,
			};
			console.log(payload);
			const resp = await getInstanciadosByFormService(payload);
			console.log('resp', resp);
			dispatch({
				type: INSTANCIADOSRESULT_ACTIONS.SET_INSTANCIADOS_RESULT,
				payload: { ...resp, currentPage },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handlePage = {
		change: page => {
			dispatch({
				type: INSTANCIADOSRESULT_ACTIONS.SET_CURRENT_PAGE,
				payload: page,
			});
		},
		setSize: size => {
			dispatch({
				type: INSTANCIADOSRESULT_ACTIONS.SET_PAGE_SIZE,
				payload: size,
			});
		},
	};

	return {
		instanciadosResult,
		getInstanciadosByFicha,
		getInstanciadosByForm,
		handlePage,
	};
};
