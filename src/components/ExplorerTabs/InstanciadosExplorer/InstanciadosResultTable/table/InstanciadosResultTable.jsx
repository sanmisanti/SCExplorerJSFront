import { Table } from 'react-bootstrap';
const InstanciadosResultTable = filas => {
	console.log(filas);

	return (
		<Table striped bordered hover size='sm' className='table-responsive-sm'>
			<thead>
				<tr>
					<th className='col-1'>Estado</th>
					<th className='col-2'>Codigo</th>
					<th className='col-8'>Descripcion</th>
					<th className='col-1'>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className='col-1'>1</td>
					<td className='col-2'>2</td>
					<td className='col-8'>3</td>
					<td className='col-1'>4</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default InstanciadosResultTable;
