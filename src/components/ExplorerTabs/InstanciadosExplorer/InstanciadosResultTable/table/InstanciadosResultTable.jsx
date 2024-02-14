import { Table } from 'react-bootstrap';
import s from './InstanciadosResultTable.module.scss';
import { useCart } from '../../../../../hooks/useCart.js';
import InstanciadosTableRow from './Rows/InstanciadoTableRow.jsx';
import PlaceHolderTableBody from './Placeholder/PlaceholderTabla.jsx';

const InstanciadosResultTable = ({ itemsToRender, loading, pageSize }) => {
	const { addToCart, cart, removeFromCart, setNewCantidad } = useCart();

	return (
		<Table bordered hover size='sm' className='table-responsive-sm'>
			<thead>
				<tr className='align-middle text-center'>
					<th className='col-1'>Carrito</th>
					<th className='col-1'>Codigo</th>
					<th className='col-9'>Descripcion</th>
					<th className='col-1'>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{loading ? (
					<PlaceHolderTableBody pageSize={pageSize} s={s} />
				) : (
					itemsToRender.map((item, i) => {
						const thisItemsCart = cart.filter(
							cartItem => cartItem.id === item.id
						);
						const cantidadEnCarrito = thisItemsCart.length;
						const style =
							cantidadEnCarrito > 0
								? 'align-middle text-center table-info '
								: 'align-middle text-center table-light';
						return (
							<InstanciadosTableRow
								key={i}
								{...{
									item,
									i,
									style,
									cantidadEnCarrito,
									addToCart,
									removeFromCart,
									setNewCantidad,
									s,
								}}
							/>
						);
					})
				)}
			</tbody>
		</Table>
	);
};

export default InstanciadosResultTable;
