import s from './InstanciadosResult.module.scss';
import { Pagination, Dropdown, Stack } from 'react-bootstrap';
import InstanciadosResultTable from './table/InstanciadosResultTable.jsx';
import { useContext } from 'react';
import { InstanciadosContext } from '../../../Context/InstanciadosProviders.jsx';
const InstanciadosResult = () => {
	const { instanciadosResult, handlePage } = useContext(InstanciadosContext);
	const {
		itemsInstanciados,
		loading,
		/* totalItems, */
		totalPages,
		pageSize,
		currentPage,
	} = instanciadosResult;
	const itemsToRender = itemsInstanciados.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);
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
							<Dropdown.Item onClick={() => handlePage.setSize(5)}>
								5
							</Dropdown.Item>
							<Dropdown.Item onClick={() => handlePage.setSize(10)}>
								10
							</Dropdown.Item>
							<Dropdown.Item onClick={() => handlePage.setSize(50)}>
								50
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<span>resultados</span>
				</Stack>
			</Stack>

			<div className={`mt-0 ${s.Tabla}`}>
				{hayFilas > 0 ? (
					<>
						<InstanciadosResultTable {...{ itemsToRender, loading }} />
						{totalPages > 1 && (
							<Pagination>
								<Pagination.First
									onClick={() => handlePage.change(1)}
									disabled={currentPage === 1}
								/>
								<Pagination.Prev
									onClick={() => handlePage.change('prev')}
									disabled={currentPage === 1}
								/>
								<Pagination.Item active>{currentPage}</Pagination.Item>
								<Pagination.Next
									onClick={() => handlePage.change('next')}
									disabled={currentPage === totalPages}
								/>
								<Pagination.Last
									onClick={() => handlePage.change(totalPages)}
									disabled={currentPage === totalPages}
								/>
							</Pagination>
						)}
					</>
				) : (
					<p>No hay items</p>
				)}
			</div>
		</div>
	);
};

export default InstanciadosResult;
