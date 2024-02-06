import { Table, Button } from 'react-bootstrap';
import { useCart } from '../../../../../hooks/useCart.js';
const InstanciadosResultTable = ({ itemsToRender, loading }) => {
	const { addToCart, cart } = useCart();

	if (loading) {
		return (
			<div className='spinner-border text-primary' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		);
	}
	return (
		<>
			<Table bordered hover size='sm' className='table-responsive-sm'>
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
						const style = cart.find(cartItem => cartItem.id === item.id)
							? 'align-middle text-center table-info'
							: 'align-middle text-center table-light';
						return (
							<tr key={i} className={style} onClick={() => addToCart(item)}>
								<td>Ok</td>
								<td>{`${item.codClase}-${item.itemCod}`}</td>
								<td className='text-start pl-1'>{item.descripcion}</td>
								<td>
									<Button variant='light btn-sm'>+</Button>
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
