import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { SaltaSelect } from '../_Atoms/SaltaSelect';
import { ClasesContext } from '../Context/ClasesProvider';

const ABMClase = () => {
	const { formFiltrosValues, handlersFormChange } = useContext(ClasesContext);

	const [descripcion, setDescripcion] = useState('');
	const [observacion, setObservacion] = useState('');
	const [selectedProps, setSelectedProps] = useState([]);
	const [props, setProps] = useState([]);

	const handleSubmit = () => {
		alert(`Enviar Datos`);
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
						<SaltaSelect
							placeholder='Categoría'
							name='categorias'
							value={formFiltrosValues.categorias.selected}
							options={formFiltrosValues.categorias.options}
							onChange={handlersFormChange.selects}
						/>
					</Form.Group>
				</Row>
				<Row className='w-100 pb-5'>
					<div className='d-flex flex-column gap-3'>
						<Form.Group className='w-100'>
							<Form.Label>Rubro</Form.Label>
							<SaltaSelect
								placeholder='Rubro'
								name='rubros'
								value={formFiltrosValues.rubros.selected}
								options={formFiltrosValues.rubros.options}
								onChange={handlersFormChange.selects}
							/>
						</Form.Group>
						<Form.Group className='w-100'>
							<Form.Label>SubRubro</Form.Label>
							<SaltaSelect
								placeholder='Subrubro'
								name='subrubros'
								optionsOrigin='rubros'
								value={formFiltrosValues.subrubros.selected}
								options={formFiltrosValues.subrubros.options}
								onChange={handlersFormChange.selects}
							/>
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
							<SaltaSelect
								placeholder='Inciso'
								name='incisos'
								value={formFiltrosValues.incisos.selected}
								options={formFiltrosValues.incisos.options}
								onChange={handlersFormChange.selects}
							/>
						</Form.Group>
						<Form.Group className='flex-grow-1'>
							<Form.Label>Principal</Form.Label>
							<SaltaSelect
								placeholder='Principal'
								name='principales'
								optionsOrigin='incisos'
								value={formFiltrosValues.principales.selected}
								options={formFiltrosValues.principales.options}
								onChange={handlersFormChange.selects}
							/>
						</Form.Group>
						<Form.Group className='flex-grow-1'>
							<Form.Label>Parcial</Form.Label>
							<SaltaSelect
								placeholder='Parcial'
								name='parciales'
								optionsOrigin='principales'
								value={formFiltrosValues.parciales.selected}
								options={formFiltrosValues.parciales.options}
								onChange={handlersFormChange.selects}
							/>
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
								!formFiltrosValues.incisos.selected
									? ''
									: formFiltrosValues.incisos.selected.value === 3
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
					<Typeahead
						id={'toggle-props'}
						labelKey='name'
						multiple
						onChange={setSelectedProps}
						options={props}
						placeholder='Choose several states...'
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
