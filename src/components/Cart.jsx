import React, { useContext } from 'react';
import { CartContext } from './Context/CartProvider';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

const Cart = () => {
	const { cart, addToCart, clearCart } = useContext(CartContext);

	return (
		<>
			<h1>Items Seleccionados</h1>
			<Table>
				<thead>
					<tr className='align-middle text-center'>
						<th className='col-1'>Codigo</th>
						<th className='col-1'>Clase</th>
						<th className='col-9'>Descripcion</th>
					</tr>
				</thead>
				<tbody>
					{cart.map(item => {
						return (
							<tr
								key={item.id}
								className='align-middle text-center table-success'
								onClick={() => addToCart(item)}
							>
								<td>{`${item.codClase}-${item.itemCod}`}</td>
								<td>{item.Clases.descripcion}</td>

								<td className='text-start pl-1'>{item.descripcion}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{cart.length > 0 && (
				<Button className='mb-2' onClick={() => clearCart()}>
					Limpiar Carrito
				</Button>
			)}
		</>
	);
};

export default Cart;
