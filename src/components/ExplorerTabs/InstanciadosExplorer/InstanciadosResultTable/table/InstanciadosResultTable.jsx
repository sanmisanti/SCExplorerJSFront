import { Table, Button } from 'react-bootstrap';
const InstanciadosResultTable = ({ itemsToRender, loading }) => {
	if (loading) {
		return (
			<div className='spinner-border text-primary' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		);
	}
	return (
		<>
			<Table striped bordered hover size='sm' className='table-responsive-sm'>
				<thead>
					<tr className='align-middle text-center'>
						<th className='col-1'>Estado</th>
						<th className='col-1'>Codigo</th>
						<th className='col-9'>Descripcion</th>
						<th className='col-1'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{itemsToRender.map((item, i) => {
						return (
							<tr key={i} className='align-middle text-center'>
								<td>Ok</td>
								<td>{`${item.codClase}-${item.itemCod}`}</td>
								<td className='text-start pl-1'>{item.descripcion}</td>
								<td>
									<Button variant='light'>✏️</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};

export default InstanciadosResultTable;
