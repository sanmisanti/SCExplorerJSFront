import { useReducer } from 'react';
import { getFichaByClaseCod } from '../services/instanciasService.jsx';
/* import serviicio */

const FICHA_ACTIONS = {
	INITIAL: 'initial',
	SET_LOADING: 'set_loading',
	UPDATE_FICHA: 'update_ficha',
};
const FICHA_ACTIONS_REDUCER = {
	[FICHA_ACTIONS.INITIAL]: (state, action) => {
		const { fichaData } = action.payload;
		const objOptions = getInitialOptions(fichaData);

		return {
			...state,
			selectedFicha: fichaData,
			objOptions,
			loading: false,
		};
	},
	[FICHA_ACTIONS.SET_LOADING]: (state, action) => {
		return { ...state, loading: action.payload };
	},
	[FICHA_ACTIONS.UPDATE_FICHA]: (state, action) => {
		const { selectedFicha } = state;
		const options = updateFichaOptions(
			selectedFicha,
			state.objOptions,
			action.payload
		);
		return {
			...state,
			objOptions: options,
		};
	},
	[FICHA_ACTIONS.SET_ERROR]: (state, action) => {
		return { ...state, error: action.payload };
	},
	[FICHA_ACTIONS.RESET]: (state, action) => {
		return { ...action.payload };
	},
};
/* selects= [{propiedadCod:nn, descripcion:"xxx"},...] */

const getInitialOptions = fichaData => {
	const { clasePropiedades, vals, umes, ipvumes } = fichaData;
	const newOptions = {};
	Object.entries(clasePropiedades).forEach(([proCod, proDescripcion]) => {
		newOptions[proCod] = {
			label: proDescripcion,
			selected: null,
			viableOptions: [],
		};
	});
	buildOptions(newOptions, ipvumes, umes, vals);
	return newOptions;
};

const updateFichaOptions = (fichaData, objOptions, thisSelected) => {
	const { vals, umes, ipvumes } = fichaData;
	const { selectedPropCod, valAndLabel } = thisSelected;

	let newOptions = { ...objOptions };
	newOptions[selectedPropCod].selected = valAndLabel;

	let filteredIPVUME = ipvumes;
	const selectedOptions = Object.keys(objOptions).map(
		propCodKey => objOptions[propCodKey].selected
	);
	const selectedValues = selectedOptions.filter(o => o).map(o => o.value);

	const potentialIteCods = [...ipvumes]
		.filter(row => {
			const matchsWithSelection = selectedValues.includes(
				`${row.valCodigo}-${row.umeCodigo}`
			);
			return matchsWithSelection;
		})
		.map(row => row.iteCodigo);

	filteredIPVUME = ipvumes.filter(row => {
		const { proCodigo, iteCodigo } = row;
		return newOptions[proCodigo] && potentialIteCods.includes(iteCodigo);
	});
	Object.keys(newOptions).forEach(proCod => {
		newOptions[proCod].viableOptions = [];
	});

	const IPVUMEforBuildingOptions = filteredIPVUME.length
		? filteredIPVUME
		: ipvumes;
	buildOptions(newOptions, IPVUMEforBuildingOptions, umes, vals);
	return newOptions;
};

const buildOptions = (objOptions, ipvumes, umes, vals) => {
	ipvumes.forEach(row => {
		const { proCodigo, valCodigo, umeCodigo } = row;
		if (objOptions[proCodigo]) {
			const ume = umeCodigo == '0' ? '' : ' ' + umes[umeCodigo];
			const value = `${valCodigo}-${umeCodigo}`;
			const viableOptions = objOptions[proCodigo].viableOptions;

			if (viableOptions.findIndex(o => o.value == value) !== -1) {
				return;
			}
			const option = {
				value,
				label: `${vals[valCodigo]}${ume}`.toLowerCase(),
			};
			viableOptions.push(option);
		}
	});
	return;
};

const fichaValuesReducer = (state, action) => {
	const actionReducer = FICHA_ACTIONS_REDUCER[action.type];
	return actionReducer ? actionReducer(state, action) : state;
};

export const useFichaValues = () => {
	const originalOptions = {
		selectedFicha: null,
		options: null,
		loading: false,
		error: false,
	};
	const [fichaFiltrosValues, dispatch] = useReducer(
		fichaValuesReducer,
		originalOptions
	);

	const filtrosValuesChangeHandlers = {
		get: async objClase => {
			if (!objClase) {
				dispatch({ type: FICHA_ACTIONS.RESET, payload: originalOptions });
				return;
			}

			dispatch({ type: FICHA_ACTIONS.SET_LOADING, payload: true });
			let fichaData;

			try {
				fichaData = await getFichaByClaseCod(objClase.claseCod);
			} catch (error) {
				console.log(error);
			}
			if (!fichaData) {
				dispatch({ type: FICHA_ACTIONS.RESET, payload: originalOptions });
				return;
			}
			dispatch({
				type: FICHA_ACTIONS.INITIAL,
				payload: { fichaData },
			});
		},
		update: (valAndLabel, { name }) => {
			console.log;
			dispatch({
				type: FICHA_ACTIONS.UPDATE_FICHA,
				payload: {
					selectedPropCod: name,
					valAndLabel,
				},
			});
		},
		reset: () => {
			dispatch({ type: FICHA_ACTIONS.RESET });
		},
	};

	return {
		fichaFiltrosValues,
		filtrosValuesChangeHandlers,
	};
};
