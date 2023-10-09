import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import categoriaService from '../../services/categoriaService';
import rubrosService from '../../services/rubrosService';
import propiedadesService from '../../services/propiedadesService';
import Container from 'react-bootstrap/Container';
import { Button, Form, InputGroup, Row, ToggleButton } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import ogDetalleService from '../../services/ogDetalleService';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const ABMClase = () => {
	const [categorias, setCategorias] = useState([]);
	const [ogDetalles, setOgDetalles] = useState([]);
	const [incisos, setIncisos] = useState([]);
	const [principal, setPrincipal] = useState([]);
	const [parcial, setParcial] = useState([]);
	const [descCategorias, setDescCategorias] = useState([]);
	const [selectedRubro, setSelectedRubro] = useState();
	const [selectedInciso, setSelectedInciso] = useState(0);
	const [propiedades, setPropiedades] = useState([]);
	const [rubros, setRubros] = useState([]);
	const [subRubros, setSubRubros] = useState([]);

	const TypeOptions = [
		{ value: 151, label: 'UNIDAD' },
		{ value: 176, label: 'SERVICIO' },
	];

	useEffect(() => {
		return () => {
			categoriaService.getAllCategorias().then(categoria => {
				setCategorias(categoria);
				setDescCategorias(categoria.map(r => r.descripcion));
			});
			ogDetalleService.getAllogDetalle().then(ogDetalles => {
				setOgDetalles(ogDetalles);
				/* console.log('ogDetalle', ogDetalles); */
				setIncisos(
					ogDetalles
						.filter(f => f.nivel === 1)
						.map(inc => inc.manualCod + ' - ' + inc.descripcion)
				);
			});
			propiedadesService.getAllPropiedades().then(propiedades => {
				/* console.log('propiedades', propiedades); */
			});
			rubrosService.getAllRubros().then(rubros => {
				console.log('rubros, ', rubros);
				const data = rubros[0];
				console.log('data', data);
				const rubrosEconomicos = data.reduce((prev, curr) => {
					const { rubCod, rubDesc } = curr;
					const uniques = [...prev];
					if (!uniques.filter(r => r.rubCod == rubCod).length != 0) {
						uniques.push({ rubCod, rubDesc });
					}
					return uniques;
				}, []);
				setRubros(rubrosEconomicos);
				console.log('rubrosEconomicos', rubrosEconomicos);
				/* setRubros(rubros);
				setSubRubros(rubros.map(r => r.subRubro)); */
			});
		};
	}, []);

	const fillPPrincipal = selected => {
		if (selected.length !== 0) {
			const descInciso = selected[0].split(' - ')[1];
			/* console.log('descInciso', descInciso); */
			const inciso = ogDetalles.filter(p => p.descripcion === descInciso);
			/* console.log('inciso', inciso); */
			const codInciso = inciso[0].manualCod;

			setSelectedInciso(codInciso);
			/* console.log('codInciso', codInciso); */
			setPrincipal(
				ogDetalles
					.filter(f => f.nivel === 2 && f.padreCod === parseInt(codInciso))
					.map(inc => inc.manualCod + ' - ' + inc.descripcion)
			);
		} else {
			setPrincipal([]);
		}
	};

	const fillPParcial = selected => {
		if (selected.length !== 0) {
			const descPrincipal = selected[0].split(' - ')[1];
			/* console.log('descInciso', descPrincipal); */
			const principal = ogDetalles.filter(
				p =>
					p.descripcion === descPrincipal &&
					p.padreCod === parseInt(selectedInciso)
			);
			const codPrincipal = principal[0].ogDetCod;
			/* console.log('codInciso', codInciso); */
			setParcial(
				ogDetalles
					.filter(f => f.nivel === 3 && f.padreCod === parseInt(codPrincipal))
					.map(inc => inc.manualCod + ' - ' + inc.descripcion)
			);
		} else {
			setParcial([]);
		}
	};

	return (
		<Container className='d-grid bg-light border rounded'>
			<div className='p-3 text-center'>
				<h1>ABM Clase</h1>
			</div>
			<Form>
				<Row className='w-50 pb-5'>
					<Form.Group>
						<Form.Label>Categoría</Form.Label>
						<Typeahead
							options={descCategorias}
							id={'toggle-rubro'}
							onChange={selected => console.log(selected)}
							placeholder={'Selecciona un rubro'}
						></Typeahead>
					</Form.Group>
				</Row>
				<Row className='w-100 pb-5'>
					<div className='d-flex flex-row gap-5'>
						<Form.Group className='w-100'>
							<Form.Label>Rubro</Form.Label>
							<Typeahead
								options={rubros.rubDesc}
								id={'toggle-rubro'}
								onChange={selected => console.log(selected)}
								placeholder={'Selecciona un rubro'}
							></Typeahead>
						</Form.Group>
						<Form.Group className='w-100'>
							<Form.Label>Rubro</Form.Label>
							<Typeahead
								options={rubros}
								id={'toggle-rubro'}
								onChange={selected => console.log(selected)}
								placeholder={'Selecciona un rubro'}
							></Typeahead>
						</Form.Group>
					</div>
				</Row>
				<Row>
					<Form.Label>Objeto del Gasto</Form.Label>
				</Row>
				<Row className='pb-5'>
					<div className='d-flex flex-row gap-3'>
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
				<Row className='w-25 pb-5'>
					<Form.Label>Tipo - HARDCODEADO</Form.Label>
					<Typeahead
						options={TypeOptions}
						id={'toggle-TYPE'}
						onChange={selected => console.log(selected)}
						placeholder={'Selecciona un tipo'}
					></Typeahead>
				</Row>
				<Row className='pb-3'>
					<Form.Label>Descripción</Form.Label>
					<InputGroup>
						<Form.Control
							placeholder='Ingresa una descripción'
							className='h-500px'
						/>
					</InputGroup>
				</Row>
				<Row className='pb-5'>
					<Form.Label>Observación</Form.Label>
					<InputGroup>
						<Form.Control
							placeholder='Ingresa una observacion'
							className='h-500px'
						/>
					</InputGroup>
				</Row>
				<Row>
					<Form.Label>Propiedades</Form.Label>
				</Row>
				<Row className='d-flex flex-row-reverse'>
					<Button className='w-25' variant='outline-success'>
						Success
					</Button>
				</Row>
			</Form>
		</Container>
	);
};

export default ABMClase;
