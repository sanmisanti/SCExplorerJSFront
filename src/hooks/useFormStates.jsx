import { useEffect, useReducer, useMemo } from 'react';
import { useFormData } from './useFormData.jsx';

const dependientes = {
	rubros: 'subrubros',
	incisos: 'principales',
	principales: 'parciales',
};

const ACTIONS_TYPE = {
	SELECT: 'select',
	INPUT: 'input',
};
const ACTIONS_REDUCER = {
	[ACTIONS_TYPE.INITIAL]: (state, action) => {
		const { originalOptions } = action.payload;
		return {
			...originalOptions,
		};
	},
	[ACTIONS_TYPE.SELECT]: (state, action) => {
		const { valAndLabel, name, formData } = action.payload;
		const dependiente = dependientes[name];
		if (dependiente) {
			handleOptions(state, dependiente, valAndLabel, formData);
		}
		return {
			...state,
			[name]: {
				...state[name],
				selected: valAndLabel,
			},
		};
	},
	[ACTIONS_TYPE.INPUT]: (state, action) => {
		const { name, value } = action.payload;
		return {
			...state,
			[name]: {
				...state[name],
				selected: value,
			},
		};
	},
};

const handleOptions = (state, dependentSelect, valAndLabel, formData) => {
	if (dependentSelect == 'parciales') {
		try {
			state.parciales.options = formData.objetosGasto
				.find(o => o.ogDetCod == state.incisos.selected.value)
				.ogDetalles.find(o => o.ogDetCod == valAndLabel.value)
				.ogDetalles.map(o => ({
					value: o.ogDetCod,
					label: `${o.manualCod} - ${o.descripcion}`,
				}));
		} catch (e) {
			state.parciales.options = [];
		}
		state.parciales.selected = '';
	}
	if (dependentSelect == 'principales') {
		try {
			state.principales.options = formData.objetosGasto
				.find(o => o.ogDetCod == valAndLabel.value)
				.ogDetalles.map(o => ({
					value: o.ogDetCod,
					label: `${o.manualCod} - ${o.descripcion}`,
				}));
		} catch (e) {
			state.principales.options = [];
		}
		state.parciales.options = [];
		state.parciales.selected = '';
		state.principales.selected = '';
	}
	if (dependentSelect == 'subrubros') {
		try {
			state.subrubros.options = formData.rubros
				.find(r => r.rubCod == valAndLabel.value)
				.SubrubrosEconomicos.map(r => ({
					value: r.subRubCod,
					label: `${r.subRubCodForShow} - ${r.subRubDesc}`,
				}));
		} catch (e) {
			state.subrubros.options = [];
		}
		state.subrubros.selected = '';
	}
};

const reducer = (state, action) => {
	const actionReducer = ACTIONS_REDUCER[action.type];
	return actionReducer ? actionReducer(state, action) : state;
};

export const useFormStates = () => {
	const formData = useFormData();

	const [formFiltrosValues, dispatch] = useReducer(reducer, null);

	const handlersFormChange = useMemo(
		() => ({
			initial: originalOptions => {
				dispatch({
					type: ACTIONS_TYPE.INITIAL,
					payload: { originalOptions },
				});
			},
			selects: (valAndLabel, { name }) => {
				dispatch({
					type: ACTIONS_TYPE.SELECT,
					payload: { name, valAndLabel, formData },
				});
			},
			inputs: ({ target }) => {
				let { name, value } = target;
				value = name === 'descripcion' ? value : parseInt(value, 10);
				dispatch({
					type: ACTIONS_TYPE.INPUT,
					payload: { name, value },
				});
			},
		}),
		[formData]
	);
	useEffect(() => {
		if (formData) {
			const { originalOptions } = formData;
			handlersFormChange.initial(originalOptions);
		}
	}, [formData, handlersFormChange]);

	return { formFiltrosValues, handlersFormChange };
};
