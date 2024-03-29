import { useContext } from 'react';
import { Form, Stack, Spinner, Button } from 'react-bootstrap';
import { InstanciadosContext } from '../../../../Context/InstanciadosProviders';
import s from './instanciadosFicha.module.scss';
import FichaTable from './table/InstanciadosFichaTable.jsx';
import { CartContext } from '../../../../Context/CartProvider.jsx';

const InstanciadosFicha = () => {
	const {
		formFiltrosValues,
		fichaFiltrosHeadersValues,
		fichaFiltrosValues,
		filtrosValuesChangeHandlers,
		getInstanciadosByFicha,
		instanciadosResult,
	} = useContext(InstanciadosContext);

	const { handlePageChange } = useContext(CartContext);

	if (formFiltrosValues == null) {
		/*RETURN SPINNER */
		return <div>Cargando...</div>;
	}
	const { fichaHeaders } = fichaFiltrosHeadersValues;
	const spanAlertClassName = fichaHeaders.error
		? s.span_ingrese_error
		: fichaHeaders.descripcion
		? s.span_ingrese_succes
		: s.span_ingrese_base;

	const fichaHeadersLoaded =
		fichaHeaders.descripcion && !fichaHeaders.loading && !fichaHeaders.error;

	const fichaValuesReadyToLoad =
		fichaHeadersLoaded && !fichaFiltrosValues.selectedFicha;
	const fichaValuesLoading = fichaHeadersLoaded && fichaFiltrosValues.loading;
	const fichaValuesLoaded =
		fichaHeadersLoaded && fichaFiltrosValues.selectedFicha;

	return (
		<>
			<Stack direction='horizontal' gap={3}>
				<Form.Label>Ficha: </Form.Label>
				<div className='mb-2'>
					{fichaHeaders.loading ? (
						<Spinner animation='border' />
					) : (
						<span className={`${s.span_ingrese} ${spanAlertClassName}`}>
							{fichaHeaders.descripcion ||
								(fichaHeaders.error
									? 'Código Incorrecto'
									: 'Ingrese un Código de Item Genérico')}
							<span className='material-symbols-outlined'>barcode</span>
						</span>
					)}
				</div>
			</Stack>
			<div className={`${s.tabla_container} rounded`}>
				{fichaValuesLoading ? (
					<Spinner animation='border' />
				) : fichaValuesLoaded ? (
					<>
						<FichaTable
							fichaHeaders={{ ...fichaHeaders }}
							fichaFiltrosValues={{ ...fichaFiltrosValues }}
							updateFiltrosValues={filtrosValuesChangeHandlers.update}
						/>
						<Button
							onClick={() => {
								handlePageChange('particulares');
								getInstanciadosByFicha(
									fichaHeaders.claseCod,
									fichaFiltrosValues.potentialIteCods
								);
							}}
						>
							{instanciadosResult.loading ? (
								<Spinner animation='border' />
							) : (
								'Buscar por Valores'
							)}
						</Button>
					</>
				) : fichaValuesReadyToLoad ? (
					<Button
						className='align-self-end'
						size='sm'
						variant='primary'
						onClick={() => filtrosValuesChangeHandlers.get(fichaHeaders)}
					>
						Cargar Ficha
					</Button>
				) : (
					<span className={s.span_ingrese_base}>
						Ingrese un Codigo de Item Generico para Buscar propiedades
					</span>
				)}
			</div>
		</>
	);
};

export default InstanciadosFicha;
