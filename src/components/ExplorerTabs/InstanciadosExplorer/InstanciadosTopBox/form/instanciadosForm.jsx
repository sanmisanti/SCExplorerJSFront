import {
	Stack,
	Button,
	Form,
	Accordion,
	InputGroup,
	Badge,
	Row,
	Col,
} from 'react-bootstrap';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { InstanciadosContext } from '../../../../Context/InstanciadosProviders.jsx';
import { SaltaSelect } from '../../../../_Atoms/SaltaSelect.jsx';

import './instanciadosForm.scss';

const InstanciadosForm = () => {
	const {
		formFiltrosValues,
		handlersFormChange,
		getFichaClaseHeaders,
		filtrosValuesChangeHandlers,
		getInstanciados,
	} = useContext(InstanciadosContext);

	const [activesKeys, setActiveKeys] = useState({
		og: null,
		rub: null,
		cat: null,
	});

	const handleAcordions = useCallback(
		key => {
			const newKeys = Object.fromEntries(
				Object.keys(activesKeys).map(k => {
					const isThisItem = k == key;
					const isTihsNull = activesKeys[k] == null;
					const val = !isThisItem || (isThisItem && !isTihsNull) ? null : '0';
					return [k, val];
				})
			);
			setActiveKeys(newKeys);
		},
		[activesKeys]
	);

	useEffect(() => {
		const handleWindowAcordion = e => {
			const target = e.target;
			const isNotAcordeon = target.closest('.agrupaciones_acordeon') == null;
			const isOption = target.classList.contains('salta-select__option');
			if (!isOption && isNotAcordeon) {
				handleAcordions(null);
			}
		};
		window.addEventListener('click', handleWindowAcordion);
		return () => window.removeEventListener('click', handleWindowAcordion);
	}, [handleAcordions]);

	if (formFiltrosValues == null) {
		/*RETURN SPINNER */
		return <div>Cargando...</div>;
	}

	const cantidadFiltrosSeleccionados = Object.values(formFiltrosValues)
		.filter(f => f.selected && f.type === 'select')
		.reduce(
			(acc, curr) => {
				acc[curr.group]++;
				return acc;
			},
			{
				og: 0,
				cat: 0,
				rub: 0,
			}
		);

	return (
		<Fragment>
			<Stack gap={4}>
				<Row>
					<Col md={5} className=''>
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
										filtrosValuesChangeHandlers.reset();
									}}
								/>
							</InputGroup>
						</Form.Group>
					</Col>
					<Col md={3}>
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

					<Row gap={1}>
						<Col>
							<Accordion
								flush
								className='agrupaciones_acordeon mb-3'
								activeKey={activesKeys.og}
								data-group='og'
							>
								<Accordion.Item eventKey='0'>
									<Accordion.Button
										className='py-2 px-3 agrupaciones_boton'
										onClick={() => handleAcordions('og')}
									>
										<Stack direction='horizontal' gap={3}>
											<span className='material-symbols-outlined '>
												checklist
											</span>{' '}
											<span>Objeto del Gasto</span>
											{cantidadFiltrosSeleccionados.og > 0 && (
												<Badge pill bg='secondary' className='badge'>
													{cantidadFiltrosSeleccionados.og}
												</Badge>
											)}
										</Stack>
									</Accordion.Button>

									<Accordion.Body className='bg-light'>
										<Form.Group className='' controlId='objetoGasto'>
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
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
						<Col>
							<Accordion
								flush
								className='agrupaciones_acordeon mb-3 CATEGORIA'
								activeKey={activesKeys.cat}
								key='cat'
							>
								<Accordion.Item eventKey='0'>
									<Accordion.Button
										className='py-2 px-3 agrupaciones_boton'
										onClick={() => handleAcordions('cat')}
									>
										<Stack direction='horizontal' gap={3}>
											<span className='material-symbols-outlined '>
												category
											</span>{' '}
											<span>Categoria</span>
											{cantidadFiltrosSeleccionados.cat > 0 && (
												<Badge pill bg='secondary' className='badge'>
													{cantidadFiltrosSeleccionados.cat}
												</Badge>
											)}
										</Stack>
									</Accordion.Button>

									<Accordion.Body className='bg-light'>
										<Form.Group className='' controlId='categoria'>
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
						</Col>
					</Row>
					<Row>
						<Col sm={12} md={9}>
							<Accordion
								flush
								className='agrupaciones_acordeon mb-3 RUBRO'
								activeKey={activesKeys.rub}
								key='rub'
							>
								<Accordion.Item eventKey='0'>
									<Accordion.Button
										className='py-2 px-3 agrupaciones_boton'
										onClick={() => handleAcordions('rub')}
									>
										<Stack direction='horizontal' gap={3}>
											<span className='material-symbols-outlined '>
												storefront
											</span>{' '}
											<span>Rubros - Subrubros</span>
											{cantidadFiltrosSeleccionados.rub > 0 && (
												<>
													<Badge pill bg='secondary' className='badge'>
														{cantidadFiltrosSeleccionados.rub}
													</Badge>
												</>
											)}
										</Stack>
									</Accordion.Button>

									<Accordion.Body className='bg-light'>
										<Form.Group className='' controlId='codGenerico'>
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
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</Form.Group>
			</Stack>
			<hr className='separador' />
			<Button
				className='mt-0'
				variant='primary'
				type='button'
				onClick={() => getInstanciados.form()}
			>
				Buscar Items
			</Button>
		</Fragment>
	);
};

export default InstanciadosForm;
