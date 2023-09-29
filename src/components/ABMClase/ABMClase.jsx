import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import rubroService from '../../services/rubroService';
import Container from 'react-bootstrap/Container';
import { Button, Form, Row, ToggleButton } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import ogDetalleService from '../../services/ogDetalleService';

const ABMClase = () => {
	const [rubros, setRubros] = useState([]);
	const [ogDetalles, setOgDetalles] = useState([]);
	const [incisos, setIncisos] = useState([]);
	const [principal, setPrincipal] = useState([]);
	const [parcial, setParcial] = useState([]);
	const [descRubros, setDescRubros] = useState([]);
	const [selectedRubro, setSelectedRubro] = useState();
	const [selectedInciso, setSelectedInciso] = useState(0);

	useEffect(() => {
		return () => {
			rubroService.getAllRubros().then(rubros => {
				setRubros(rubros);
				setDescRubros(rubros.map(r => r.descripcion));
			});
			ogDetalleService.getAllogDetalle().then(ogDetalles => {
				setOgDetalles(ogDetalles);
				setIncisos(
					ogDetalles
						.filter(f => f.nivel === 1)
						.map(inc => inc.codigo + ' - ' + inc.descripcion)
				);
			});
		};
	}, []);

	const fillPPrincipal = selected => {
		if (selected.length !== 0) {
			const descInciso = selected[0].split(' - ')[1];
			/* console.log('descInciso', descInciso); */
			const inciso = ogDetalles.filter(p => p.descripcion === descInciso);
			const codInciso = inciso[0].codOgDet;
			setSelectedInciso(codInciso);
			/* console.log('codInciso', codInciso); */
			setPrincipal(
				ogDetalles
					.filter(f => f.nivel === 2 && f.codPadre === parseInt(codInciso))
					.map(inc => inc.codigo + ' - ' + inc.descripcion)
			);
		} else {
			setPrincipal([]);
		}
	};

	const fillPParcial = selected => {
		if (selected.length !== 0) {
			const descPrincipal = selected[0].split(' - ')[1];
			/* console.log('descInciso', descInciso); */
			const principal = ogDetalles.filter(
				p =>
					p.descripcion === descPrincipal &&
					p.codPadre === parseInt(selectedInciso)
			);
			const codPrincipal = principal[0].codOgDet;
			/* console.log('codInciso', codInciso); */
			setPrincipal(
				ogDetalles
					.filter(f => f.nivel === 2 && f.codPadre === parseInt(codInciso))
					.map(inc => inc.codigo + ' - ' + inc.descripcion)
			);
		} else {
			setPrincipal([]);
		}
	};

	return (
		<Container className='d-grid bg-danger'>
			<div className='p-3 text-center'>
				<h1>ABM Clase</h1>
			</div>
			<Form>
				<Row className='w-50 pb-5'>
					<Form.Group>
						<Form.Label>Rubro</Form.Label>
						<Typeahead
							options={descRubros}
							id={'toggle-rubro'}
							onChange={selected => console.log(selected)}
							placeholder={'Selecciona un rubro'}
						></Typeahead>
					</Form.Group>
				</Row>
				<Row>
					<Form.Label>Objeto del Gasto</Form.Label>
				</Row>
				<Row>
					<div className='d-flex flex-row'>
						<Form.Group className='flex-grow-1'>
							<Form.Label>Inciso</Form.Label>
							<Typeahead
								options={incisos}
								id={'toggle-incisos'}
								onChange={selected => fillPPrincipal(selected)}
								placeholder={'Selecciona un inciso'}
							></Typeahead>
						</Form.Group>
						<Form.Group className='flex-grow-1'>
							<Form.Label>Principal</Form.Label>
							<Typeahead
								options={principal}
								id={'toggle-principal'}
								onChange={selected => fillPParcial(selected)}
								placeholder={'Selecciona un inciso'}
							></Typeahead>
						</Form.Group>
						<Form.Group className='flex-grow-1'>
							<Form.Label>Parcial</Form.Label>
							<Typeahead
								options={parcial}
								id={'toggle-parcial'}
								placeholder={'Selecciona un inciso'}
							></Typeahead>
						</Form.Group>
					</div>
				</Row>
			</Form>
		</Container>
	);
};

export default ABMClase;
