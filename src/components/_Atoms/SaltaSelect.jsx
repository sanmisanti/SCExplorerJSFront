import Select from 'react-select';

export const SaltaSelect = ({ ...props }) => {
	const styles = {
		control: (baseStyles, state) => {
			return {
				...baseStyles,
				borderColor: state.isFocused ? '#b71b24' : '#dee2e6',
				boxShadow: state.isFocused
					? '0px 0px 0px 1.5px #b71b24'
					: state.hasValue
					? '0px 0px 0px .5px #b71b24'
					: null,
				'&:hover': {
					borderColor: state.isFocused ? '#b71b24' : '#dee2e6',
				},
				transition: 'all 0.2s ease-in-out',
				cursor: 'pointer',
			};
		},
	};
	return <Select {...props} styles={styles} isClearable={true} />;
};
