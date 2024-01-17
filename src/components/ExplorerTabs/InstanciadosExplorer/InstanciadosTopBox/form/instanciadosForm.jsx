import {
	Stack,
	Button,
	Form,
	Row,
	Col,
	Accordion,
	InputGroup,
	Badge,
} from 'react-bootstrap';
import { useContext } from 'react';
import { InstanciadosContext } from '../../../../Context/InstanciadosProviders.jsx';
import { SaltaSelect } from '../../../../_Atoms/SaltaSelect.jsx';

import './instanciadosForm.scss';

const InstanciadosForm = () => {
	const { formFiltrosValues, handlersFormChange, getFichaClaseHeaders } =
		useContext(InstanciadosContext);
	const cantidadFiltrosSeleccionados = Object.values(formFiltrosValues).filter(
		f => f.selected && f.type === 'select'
	).length;

	return (
		<Stack gap={4}>
			<Row>
				<Col md={5}>
					<Form.Group
						className='mb-sm-4 mb-md-0 formGroup'
						controlId='codGenerico'
					>
						<Form.Label>Código Item Genérico</Form.Label>
						<InputGroup>
							<InputGroup.Text id='basic-addon1'>
								<span className='material-symbols-outlined'>barcode</span>{' '}
							</InputGroup.Text>
							<Form.Control
								type='number'
								placeholder='xx'
								value={formFiltrosValues.claseCod.selected}
								name='claseCod'
								onChange={e => {
									handlersFormChange.inputs(e);
									getFichaClaseHeaders(e.target.value);
								}}
							/>
						</InputGroup>
					</Form.Group>
				</Col>
				<Col md={5}>
					<Form.Group className='mb-0 formGroup' controlId='codInstanciado'>
						<Form.Label>N° Item Particular</Form.Label>
						<InputGroup className=''>
							<InputGroup.Text>
								<span className='material-symbols-outlined'>123</span>
							</InputGroup.Text>
							<Form.Control
								name='numInstancia'
								type='number'
								placeholder='xx'
								value={formFiltrosValues.numInstancia.selected}
								onChange={handlersFormChange.inputs}
							/>
						</InputGroup>
					</Form.Group>
				</Col>
			</Row>

			<Form.Group controlId='descripcion formGroup'>
				<Form.Label>Descripcion del Item</Form.Label>
				<InputGroup>
					<InputGroup.Text>
						<span className='material-symbols-outlined'>abc</span>
					</InputGroup.Text>
					<Form.Control
						name='descripcion'
						type='text'
						placeholder='🔍 Buscar por Descripción...'
						value={formFiltrosValues.descripcion.selected}
						onChange={handlersFormChange.inputs}
					/>
				</InputGroup>
			</Form.Group>

			<Form.Group>
				<Form.Label>Filtros Avanzados</Form.Label>

				<Accordion flush className='agrupaciones_acordeon'>
					<Accordion.Item eventKey='0'>
						<Accordion.Button className='py-2 px-3 ${s.agrupaciones_boton'>
							<Stack direction='horizontal' gap={3}>
								<span className='material-symbols-outlined '>category</span>{' '}
								<span>Agrupaciones</span>
								{cantidadFiltrosSeleccionados > 0 && (
									<Badge pill bg='secondary' className='badge'>
										{cantidadFiltrosSeleccionados}
									</Badge>
								)}
							</Stack>
						</Accordion.Button>

						<Accordion.Body className='bg-light'>
							<Form.Group className='mb-3' controlId='codGenerico'>
								<Form.Label>Rubro - Subrubro</Form.Label>
								<Stack gap={2}>
									<SaltaSelect
										placeholder='Rubro'
										name='rubros'
										value={formFiltrosValues.rubros.selected}
										options={formFiltrosValues.rubros.options}
										onChange={handlersFormChange.selects}
									/>
									<SaltaSelect
										placeholder='Subrubro'
										name='subrubros'
										optionsOrigin='rubros'
										value={formFiltrosValues.subrubros.selected}
										options={formFiltrosValues.subrubros.options}
										onChange={handlersFormChange.selects}
									/>
								</Stack>
							</Form.Group>

							<Form.Group className='mb-3' controlId='objetoGasto'>
								<Form.Label>Objeto del Gasto</Form.Label>
								<Stack gap={2}>
									<SaltaSelect
										placeholder='Inciso'
										name='incisos'
										value={formFiltrosValues.incisos.selected}
										options={formFiltrosValues.incisos.options}
										onChange={handlersFormChange.selects}
									/>
									<SaltaSelect
										placeholder='Principal'
										name='principales'
										optionsOrigin='incisos'
										value={formFiltrosValues.principales.selected}
										options={formFiltrosValues.principales.options}
										onChange={handlersFormChange.selects}
									/>
									<SaltaSelect
										placeholder='Parcial'
										name='parciales'
										optionsOrigin='principales'
										value={formFiltrosValues.parciales.selected}
										options={formFiltrosValues.parciales.options}
										onChange={handlersFormChange.selects}
									/>
								</Stack>
							</Form.Group>

							<Form.Group className='mb-3' controlId='categoria'>
								<Form.Label>Categoria</Form.Label>
								<SaltaSelect
									placeholder='Categoría'
									name='categorias'
									value={formFiltrosValues.categorias.selected}
									options={formFiltrosValues.categorias.options}
									onChange={handlersFormChange.selects}
								/>
							</Form.Group>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Form.Group>

			<Button
				variant='primary'
				type='button'
				onClick={() => console.log('submit')}
			>
				Buscar
			</Button>
		</Stack>
	);
};

export default InstanciadosForm;
