import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { ClasesContext } from '../../../Context/ClasesProvider';
import Body from './Table/Body';
import Button from 'react-bootstrap/Button';
import claseService from '../../../../services/claseService';

const GenericosResultTable = ({ headers }) => {
	const { clasesToShow } = useContext(ClasesContext);
	const { handleSetPage, page } = useContext(ClasesContext);
	const { handleSetClasesToShow } = useContext(ClasesContext);

	useEffect(() => {
		handleSetClasesToShow([]);
		claseService
			.getAllClases(page)
			.then(initialClases => {
				handleSetClasesToShow(initialClases.rows);
				console.log('initialClases', initialClases);
			})
			.catch(error => {
				alert(error);
			});
	}, [page]);

	return (
		<>
			{page === 1 ? (
				<div className='d-flex justify-content-end mt-5 gap-2'>
					<Button
						className='me-100'
						variant='primary'
						onClick={() => {
							handleSetPage(page + 1);
						}}
					>
						Siguiente pagina
					</Button>
				</div>
			) : (
				<div className='d-flex justify-content-end mt-5 gap-2'>
					<Button
						className='me-100'
						variant='primary'
						onClick={() => {
							handleSetPage(page - 1);
						}}
					>
						Anterior pagina
					</Button>
					<Button
						className='me-100'
						variant='primary'
						onClick={() => {
							handleSetPage(page + 1);
						}}
					>
						Siguiente pagina
					</Button>
				</div>
			)}

			<table className='table'>
				<thead>
					<tr>
						{headers.map((header, i) => (
							<th key={i}>{header}</th>
						))}
					</tr>
				</thead>

				{/* <tbody>
					<tr key={clasesToShow.id}>
						<td colSpan={headers.length}>
							<div className='spinner-container d-flex justify-content-center'>
								<Spinner animation='border' role='status'>
									<span className='visually-hidden'>Loading...</span>
								</Spinner>
							</div>
						</td>
					</tr>
				</tbody> */}

				{clasesToShow.length > 0 ? (
					<Body rows={clasesToShow} />
				) : (
					<tbody>
						<tr key={clasesToShow.id}>
							<td colSpan={headers.length}>
								<div className='spinner-container d-flex justify-content-center'>
									<Spinner animation='border' role='status'>
										<span className='visually-hidden'>Loading...</span>
									</Spinner>
								</div>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</>
	);
};

GenericosResultTable.propTypes = {
	headers: PropTypes.array.isRequired,
};

export default GenericosResultTable;
