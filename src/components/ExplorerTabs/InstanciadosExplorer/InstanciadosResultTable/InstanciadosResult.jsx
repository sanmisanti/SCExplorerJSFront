import s from './InstanciadosResult.module.scss';
import { Dropdown, Stack } from 'react-bootstrap';
import InstanciadosResultTable from './table/InstanciadosResultTable.jsx';
import { useContext } from 'react';
import { InstanciadosContext } from '../../../Context/InstanciadosProviders.jsx';
import { CartProvider } from '../../../Context/CartProvider.jsx';
import { Paginator } from '../../../_Atoms/Pagination/Paginator.jsx';
const InstanciadosResult = () => {
	const { instanciadosResult, getInstanciados } =
		useContext(InstanciadosContext);
	const {
		itemsInstanciados,
		loading,
		/* totalItems, */
		totalPages,
		pageSize,
		currentPage,
	} = instanciadosResult;
	const itemsToRender = itemsInstanciados;
	const hayFilas = instanciadosResult?.itemsInstanciados?.length > 0;

	/* CUANDO ESTOY CAMBIANDO EL TAMAÑO DE LAS PAGINAS, TENGO QUE ACTUALIZAR TAMBIEN EL PAGINADO */
	return (
		<div className={`pt-3 mb-5 ${s.contenedor}`}>
			<Stack direction='horizontal'>
				<h3 className='mb-4'>Items Encontrados</h3>
				<Stack
					data-selected={hayFilas}
					direction='horizontal'
					className={`ms-auto mt-auto ${s.tab}`}
					gap={3}
				>
					<span>Mostra{itemsToRender.length > 0 ? 'ndo' : 'r'}</span>
					<Dropdown>
						<Dropdown.Toggle variant='light'>{pageSize}</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => getInstanciados.pageChangeSize(5)}>
								5
							</Dropdown.Item>
							<Dropdown.Item onClick={() => getInstanciados.pageChangeSize(10)}>
								10
							</Dropdown.Item>
							<Dropdown.Item onClick={() => getInstanciados.pageChangeSize(50)}>
								50
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<span>resultados</span>
				</Stack>
			</Stack>

			<div className={`mt-0 ${s.Tabla}`} style={{ minHeight: '4rem' }}>
				{hayFilas || loading ? (
					<>
						<InstanciadosResultTable
							{...{ itemsToRender, loading, pageSize }}
						/>
						{totalPages > 1 && (
							<Paginator
								currentPage={currentPage}
								totalPages={totalPages}
								handlePage={move => getInstanciados.pageChange(move)}
							/>
						)}
					</>
				) : (
					<p>No se han encontrado resultados</p>
				)}
			</div>
		</div>
	);
};

export default InstanciadosResult;
