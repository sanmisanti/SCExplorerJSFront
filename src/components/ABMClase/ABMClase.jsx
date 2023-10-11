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
	const [catSelected, setCatSelected] = useState({});
	const [rubSubRub, setRubSubRub] = useState([]);
	const [rubros, setRubros] = useState([]);
	const [rubroSelected, setRubroSelected] = useState({});
	const [subRubros, setSubRubros] = useState([]);
	const [subRubroSelected, setSubRubroSelected] = useState({});
	const [ogDetalles, setOgDetalles] = useState([]);
	const [incisos, setIncisos] = useState([]);
	const [selectedInciso, setSelectedInciso] = useState(0);
	const [principal, setPrincipal] = useState([]);
	const [selectedPrincipal, setSelectedPrincipal] = useState(0);
	const [parcial, setParcial] = useState([]);
	const [selectedParcial, setSelectedParcial] = useState(0);
	const [descripcion, setDescripcion] = useState('');
	const [observacion, setObservacion] = useState('');

	useEffect(() => {
		return () => {
			categoriaService.getAllCategorias().then(categoria => {
				setCategorias(categoria);
			});

			rubrosService.getAllRubros().then(rubros => {
				const data = rubros[0];

				setRubSubRub(data);

				const rubrosEconomicos = data.reduce((prev, curr) => {
					const { rubCod, rubDesc } = curr;
					const uniques = [...prev];
					if (!uniques.filter(r => r.rubCod == rubCod).length != 0) {
						uniques.push({ rubCod, rubDesc });
					}
					return uniques;
				}, []);

				setRubros(rubrosEconomicos);
			});

			ogDetalleService.getAllogDetalle().then(data => {
				setOgDetalles(data);

				const OGIncisos = data.filter(f => f.nivel === 1);

				setIncisos(OGIncisos);
			});
		};
	}, []);

	const fillPPrincipal = selected => {
		if (selected.length !== 0) {
			const codInciso = selected[0].value;
			const ogDetCod = selected[0].ogDetCod;
			setSelectedInciso(codInciso);

			const principal = ogDetalles.filter(
				p => p.nivel === 2 && p.padreCod === ogDetCod
			);

			setPrincipal(principal);
		} else {
			setPrincipal([]);
		}
	};

	const fillPParcial = selected => {
		if (selected.length !== 0) {
			const codPrincipal = selected[0].value;
			const ogDetCod = selected[0].ogDetCod;
			setSelectedPrincipal(codPrincipal);

			const parcial = ogDetalles.filter(
				p => p.nivel === 3 && p.padreCod === ogDetCod
			);

			setParcial(parcial);
		} else {
			setParcial([]);
		}
	};

	const handleCategoriaSelected = sel => {
		setCatSelected(sel[0]);
	};

	const handleRubroSelected = sel => {
		setRubroSelected(sel[0]);
		const codRubro = sel[0].value;
		const subrubEco = rubSubRub.filter(r => r.rubCod === codRubro);
		setSubRubros(subrubEco);
	};

	const handleSubRubroSelected = sel => {
		setSubRubroSelected(sel[0]);
	};

	const handleSubmit = () => {
		alert(
			`Categoria: ${catSelected.value} - Rubro: ${rubroSelected.value} - SubRubroCod: ${subRubroSelected.subRubCod} - subRubCodForShow: ${subRubroSelected.subRubCodForShow} - Inciso: ${selectedInciso} - Principal: ${selectedPrincipal} - Parcial: ${selectedParcial}`
		);
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
							options={categorias.map(r => ({
								label: r.categoriaCod + ' - ' + r.descripcion,
								value: r.categoriaCod,
							}))}
							id={'toggle-rubro'}
							onChange={selected => {
								handleCategoriaSelected(selected);
							}}
							placeholder={'Selecciona un rubro'}
						></Typeahead>
					</Form.Group>
				</Row>
				<Row className='w-100 pb-5'>
					<div className='d-flex flex-row gap-5'>
						<Form.Group className='w-100'>
							<Form.Label>Rubro</Form.Label>
							<Typeahead
								options={rubros.map(r => ({
									label: r.rubCod + ' - ' + r.rubDesc,
									value: r.rubCod,
								}))}
								id={'toggle-rubro'}
								onChange={selected => handleRubroSelected(selected)}
								placeholder={'Selecciona un Rubro'}
							></Typeahead>
						</Form.Group>
						<Form.Group className='w-100'>
							<Form.Label>SubRubro</Form.Label>
							<Typeahead
								options={subRubros.map(r => ({
									label: r.subRubCodForShow + ' - ' + r.subRubDesc,
									subRubCodForShow: r.subRubCodForShow,
									subRubCod: r.subRubCod,
								}))}
								id={'toggle-subrubro'}
								onChange={selected => handleSubRubroSelected(selected)}
								placeholder={'Selecciona un Subrubro'}
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
								options={incisos.map(i => ({
									label: i.manualCod + ' - ' + i.descripcion,
									value: i.manualCod,
									ogDetCod: i.ogDetCod,
								}))}
								id={'toggle-incisos'}
								onChange={selected => fillPPrincipal(selected)}
								placeholder={'Selecciona un inciso'}
							></Typeahead>
						</Form.Group>
						<Form.Group className='flex-grow-1'>
							<Form.Label>Principal</Form.Label>
							<Typeahead
								options={principal.map(p => ({
									label: p.manualCod + ' - ' + p.descripcion,
									value: p.manualCod,
									ogDetCod: p.ogDetCod,
								}))}
								id={'toggle-principal'}
								onChange={selected => fillPParcial(selected)}
								placeholder={'Selecciona un inciso'}
							></Typeahead>
						</Form.Group>
						<Form.Group className='flex-grow-1'>
							<Form.Label>Parcial</Form.Label>
							<Typeahead
								options={parcial.map(p => ({
									label: p.manualCod + ' - ' + p.descripcion,
									value: p.manualCod,
									ogDetCod: p.ogDetCod,
								}))}
								id={'toggle-parcial'}
								onChange={selected => setSelectedParcial(selected[0].value)}
								placeholder={'Selecciona un inciso'}
							></Typeahead>
						</Form.Group>
					</div>
				</Row>
				<Row className='w-25 pb-5'>
					<Form.Label>Tipo</Form.Label>
					<InputGroup>
						<Form.Control
							disabled
							className='h-500px'
							value={
								selectedInciso === 0
									? ''
									: selectedInciso === 3
									? 'SERVICIO'
									: 'UNIDAD'
							}
						/>
					</InputGroup>
				</Row>
				<Row className='pb-3'>
					<Form.Label>Descripción</Form.Label>
					<InputGroup>
						<Form.Control
							placeholder='Ingresa una descripción'
							className='h-500px'
							value={descripcion}
							onChange={e => setDescripcion(e.target.value)}
						/>
					</InputGroup>
				</Row>
				<Row className='pb-5'>
					<Form.Label>Observación</Form.Label>
					<InputGroup>
						<Form.Control
							placeholder='Ingresa una observacion'
							className='h-500px'
							value={observacion}
							onChange={e => setObservacion(e.target.value)}
						/>
					</InputGroup>
				</Row>
				<Row>
					<Form.Label>Propiedades</Form.Label>
				</Row>
				<Row className='d-flex flex-row-reverse'>
					<Button
						type='submit'
						className='w-25'
						variant='outline-success'
						onClick={handleSubmit}
					>
						Success
					</Button>
				</Row>
			</Form>
		</Container>
	);
};

export default ABMClase;
