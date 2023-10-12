import { useEffect, useState, useRef } from 'react';
import categoriaService from '../../services/categoriaService';
import rubrosService from '../../services/rubrosService';
import propiedadesService from '../../services/propiedadesService';
import Container from 'react-bootstrap/Container';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import ogDetalleService from '../../services/ogDetalleService';

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
	const [selectedProps, setSelectedProps] = useState([]);
	const [props, setProps] = useState([]);

	const typeaheadRef = useRef(null);

	useEffect(() => {
		return () => {
			categoriaService.getAllCategorias().then(categoria => {
				setCategorias(categoria);
			});

			rubrosService.getAllRubros().then(rubros => {
				/* console.log('RUBROS', rubros); */
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

			propiedadesService.getAllPropiedadesOrdered().then(data => {
				if (data.length > 1) {
					console.log('data', data);
					const props = data[0];
					console.log('props', props);
					setProps(props);
				} else {
					propiedadesService.getAllPropiedades().then(data => {
						console.log('DATA', data);
						setProps(data);
					});
				}
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
		if (sel.length !== 0) {
			setRubroSelected(sel[0]);
			const codRubro = sel[0].value;
			const subrubEco = rubSubRub.filter(r => r.rubCod === codRubro);
			setSubRubros(subrubEco);
		} else {
			setRubroSelected(0);
			setSubRubros([]);
			setSubRubroSelected(0);
		}
	};

	const handleSubRubroSelected = sel => {
		setSubRubroSelected(sel[0]);
	};

	const handleSubmit = () => {
		let propiedades = '';
		selectedProps.forEach(p => {
			propiedades += p.value + ' - ';
		});
		alert(
			`Categoria: ${catSelected.value} \n
			Rubro: ${rubroSelected.value} \n
			SubRubroCod: ${subRubroSelected.subRubCod} \n
			subRubCodForShow: ${subRubroSelected.subRubCodForShow} \n
			Inciso: ${selectedInciso} \n
			Principal: ${selectedPrincipal} \n
			Parcial: ${selectedParcial} \n
			props: ${propiedades} \n`
		);
	};

	return (
		<Container className='d-grid bg-light border rounded'>
			<div className='p-3 text-center'>
				<h1>ABM Clase</h1>
			</div>
			<Form className='p-5 pt-0'>
				<Row className='w-50 pb-5'>
					<Form.Group>
						<Form.Label>Categoría</Form.Label>
						<Typeahead
							clearButton
							options={categorias.map(r => ({
								label: r.categoriaCod + ' - ' + r.descripcion,
								value: r.categoriaCod,
							}))}
							id={'toggle-rubro'}
							onChange={selected => {
								handleCategoriaSelected(selected);
							}}
							placeholder={'Selecciona una Categoría'}
						></Typeahead>
					</Form.Group>
				</Row>
				<Row className='w-100 pb-5'>
					<div className='d-flex flex-column gap-3'>
						<Form.Group className='w-100'>
							<Form.Label>Rubro</Form.Label>
							<Typeahead
								clearButton
								options={rubros.map(r => ({
									label: r.rubCod + ' - ' + r.rubDesc,
									value: r.rubCod,
								}))}
								id={'toggle-rubro'}
								ref={typeaheadRef}
								onChange={selected => handleRubroSelected(selected)}
								placeholder={'Selecciona un Rubro'}
							></Typeahead>
						</Form.Group>
						<Form.Group className='w-100'>
							<Form.Label>SubRubro</Form.Label>
							<Typeahead
								clearButton
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
						<Form.Group className='flex-grow-1 w-responsive'>
							<Form.Label>Inciso</Form.Label>
							<Typeahead
								className='w-responsive'
								clearButton
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
								clearButton
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
								clearButton
								options={parcial.map(p => ({
									label: p.manualCod + ' - ' + p.descripcion,
									value: p.manualCod,
									ogDetCod: p.ogDetCod,
								}))}
								id={'toggle-parcial'}
								onChange={selected => {
									selected.length !== 0
										? setSelectedParcial(selected[0].value)
										: setSelectedParcial(0);
								}}
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
				<Row className='pb-5'>
					<Form.Label>Propiedades</Form.Label>
					<Typeahead
						id={'toggle-props'}
						labelKey='name'
						flip
						multiple
						onChange={setSelectedProps}
						options={props.map(p => ({
							name: p.descripcion,
							value: p.propiedadCod,
						}))}
						placeholder='Seleccionar las propiedades'
						selected={selectedProps}
					/>
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
