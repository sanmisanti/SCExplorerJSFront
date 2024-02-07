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
};

const INSTANCIADOSRESULT_REDUCERS = {
	[INSTANCIADOSRESULT_ACTIONS.SET_INSTANCIADOS_RESULT]: (
		state,
		{ payload }
	) => {
		return {
			...state,
			itemsInstanciados: payload.rows || [],
			totalItems: payload.count || 0,
			totalPages: Math.ceil(payload.count / payload.pageSize),
			currentPage: payload.currentPage || 1,
			pageSize: payload.pageSize,
			loading: false,
		};
	},
	[INSTANCIADOSRESULT_ACTIONS.SET_LOADING]: (state, action) => ({
		...state,
		loading: action.payload,
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
	const getInstanciadosByForm = async ({ formData, move, newPageSize }) => {
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
			} else if (move === null || move === undefined) {
				currentPage = 1;
			}

			let pageSize = newPageSize || instanciadosResult.pageSize;

			const payload = {
				...formData,
				currentPage,
				pageSize,
			};
			const resp = await getInstanciadosByFormService(payload);

			dispatch({
				type: INSTANCIADOSRESULT_ACTIONS.SET_INSTANCIADOS_RESULT,
				payload: { ...resp, currentPage, pageSize },
			});
		} catch (error) {
			console.log(error);
		}
	};

	return {
		instanciadosResult,
		getInstanciadosByFicha,
		getInstanciadosByForm,
	};
};
