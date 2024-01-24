import Select from 'react-select';

export const FichaSelect = ({ ...props }) => {
	const styles = {
		valueContainer: (baseStyles, state) => {
			/* console.log('valueContainer group', baseStyles); */
			return {
				...baseStyles,
				display: 'flex',
				padding: '0px 0px 0px 8px',
			};
		},
		indicatorsContainer: (baseStyles, state) => {
			/* console.log('indicatorsContainer', baseStyles); */
			return {
				...baseStyles,
				display: 'flex',
				padding: '0px',
			};
		},
		clearIndicator: (baseStyles, state) => {
			/* console.log('clearIndicator group', baseStyles); */
			return {
				...baseStyles,
				display: 'flex',
				padding: '0px',
				paddingRight: '3px',
				'&:hover': {
					color: '#b71b24',
				},
			};
		},
		indicatorSeparator: (baseStyles, state) => {
			return {
				...baseStyles,
				display: 'none',
			};
		},
		dropdownIndicator: (baseStyles, state) => {
			return {
				...baseStyles,
				display: 'none',
			};
		},

		control: (baseStyles, state) => {
			/* 	console.log('baseStyle control', baseStyles); */
			return {
				...baseStyles,
				minHeight: 24,
				borderColor: state.isFocused ? '#b71b24' : '#dee2e6',
				boxShadow: state.isFocused
					? '0px 0px 0px 1px #b71b24'
					: state.hasValue
					? '0px 0px 0px .5px #b71b24'
					: null,
				'&:hover': {
					boxShadow: '0px 0px 0px 1px #b71b24',
				},
				transition: 'all 0.2s ease-in-out',
				cursor: 'pointer',
			};
		},
		menu: (baseStyles, state) => {
			/* console.log('estado Menu', state); */
			return {
				...baseStyles,
				backgroundColor: '#fff',
				boxShadow: '0px 0px 0px 0px #b71b24',
				borderRadius: '0.375rem',
			};
		},
		option: (baseStyles, state) => {
			/* console.log('estado Option', state); */
			return {
				...baseStyles,
			};
		},
	};
	return <Select {...props} styles={styles} isClearable={true} />;
};
