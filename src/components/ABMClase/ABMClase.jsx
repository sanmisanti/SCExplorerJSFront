import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import rubroService from '../../services/rubroService';
import Container from 'react-bootstrap/Container';
import { Form, Row, ToggleButton } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const ABMClase = () => {
	const [rubros, setRubros] = useState([]);
	const [descRubros, setDescRubros] = useState([]);

	useEffect(() => {
		return () => {
			rubroService.getAllRubros().then(rubros => {
				setRubros(rubros);
				setDescRubros(rubros.map(r => r.rubroCod + ' - ' + r.descripcion));
			});
		};
	}, []);

	console.log('Rubros', rubros);
	console.log('descRubros', descRubros);

	const filterBy = (rubros, state) => {
		if (state.selected.length) {
			return true;
		}
		return descRubros.toLowerCase().indexOf(state.input.toLowerCase()) > -1;
	};

	return (
		<Container className='d-grid bg-danger'>
			<div className='p-3 text-center'>
				<h1>ABM Clase</h1>
			</div>
			<Form>
				<Row>
					<Form.Group>
						<Form.Label>Rubro</Form.Label>
						<Typeahead options={descRubros} id={'toggle-rubro'}></Typeahead>
					</Form.Group>
				</Row>
			</Form>
		</Container>
	);
};

export default ABMClase;
