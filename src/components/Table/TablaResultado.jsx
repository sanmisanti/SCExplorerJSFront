import { useContext } from 'react';
import PropTypes from 'prop-types';
import Body from './Body.jsx';
import Spinner from 'react-bootstrap/Spinner';
import { ClasesContext } from '../Context/ClasesProvider';

const TablaResultado = ({ headers }) => {
	const { clasesToShow } = useContext(ClasesContext);

	return (
		<table className='table'>
			<thead>
				<tr>
					{headers.map((header, i) => (
						<th key={i}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{clasesToShow.length > 0 ? (
					<Body rows={clasesToShow} />
				) : (
					<tr>
						<td colSpan={headers.length}>
							<div className='spinner-container'>
								<Spinner animation='border' role='status'>
									<span className='visually-hidden'>Loading...</span>
								</Spinner>
							</div>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

TablaResultado.propTypes = {
	headers: PropTypes.array.isRequired,
};

export default TablaResultado;