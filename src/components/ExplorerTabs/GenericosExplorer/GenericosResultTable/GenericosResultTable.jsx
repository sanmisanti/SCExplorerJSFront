import { useContext } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { ClasesContext } from '../../../Context/ClasesProvider';
import Body from '../../../Table/Body';

const GenericosResultTable = ({ headers }) => {
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

GenericosResultTable.propTypes = {
	headers: PropTypes.array.isRequired,
};

export default GenericosResultTable;
