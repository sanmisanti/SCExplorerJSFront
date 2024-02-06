import { useState, useEffect } from 'react';
import { getFormData } from '../services/formDataService.jsx';

const capitalize = text => {
	text = text.toLowerCase();
	const firstLetter = text.charAt(0);
	const rest = text.slice(1);
	return firstLetter.toUpperCase() + rest;
};
const formatOGDesc = objetosGasto => {
	objetosGasto.forEach(og => {
		og.descripcion = capitalize(og.descripcion);
		try {
			og.ogDetalles = formatOGDesc(og.ogDetalles);
		} catch (e) {
			null;
		}
	});
	return objetosGasto;
};

export const useFormData = () => {
	const [formData, setFormData] = useState(() => {
		try {
			const storedValue = window.localStorage.getItem('formData');
			return storedValue ? JSON.parse(storedValue) : null;
		} catch (error) {
			return null;
		}
	});
	useEffect(() => {
		if (formData === null) {
			getFormData()
				.then(data => setFormData(data))
				.catch(error => console.error('Error:', error));
		} else {
			window.localStorage.setItem('formData', JSON.stringify(formData));
		}
	}, [formData]);

	if (formData) {
		formData.objetosGasto = formatOGDesc(formData.objetosGasto);
		formData.categorias = formData.categorias.map(c => {
			c.descripcion = capitalize(c.descripcion);
			return c;
		});
		formData.originalOptions = {
			claseCod: {
				selected: '',
				type: 'input',
			},
			numInstancia: {
				selected: '',
				type: 'input',
			},
			descripcion: {
				selected: '',
				type: 'input',
			},
			rubros: {
				selected: '',
				type: 'select',
				group: 'rub',
				options: formData.rubros.map(r => ({
					value: r.rubCod,
					label: `${r.rubCod} - ${r.rubDesc}`,
				})),
			},
			subrubros: {
				selected: '',
				type: 'select',
				group: 'rub',
				options: [],
			},
			incisos: {
				selected: '',
				type: 'select',
				group: 'og',
				options: formData.objetosGasto.map(o => ({
					value: o.ogDetCod,
					label: `${o.manualCod} - ${o.descripcion}`,
				})),
			},
			principales: {
				selected: '',
				type: 'select',
				group: 'og',
				options: [],
			},
			parciales: {
				selected: '',
				type: 'select',
				group: 'og',
				options: [],
			},
			categorias: {
				selected: '',
				type: 'select',
				group: 'cat',
				options: formData.categorias.map(c => ({
					value: c.categoriaCod,
					label: `${c.descripcion}`,
				})),
			},
		};
	}

	return formData;
};
