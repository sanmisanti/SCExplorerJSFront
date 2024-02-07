import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../Context/CartProvider';
import './Cart.css';

const CartRow = ({ item }) => {
	const { addToCart } = useContext(CartContext);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleItemRemove = item => {
		setIsDeleting(true);
		setTimeout(() => addToCart(item), 500);
	};

	return (
		<tr
			key={item.id}
			className={`align-middle text-center table-success ${
				isDeleting ? 'fade-out' : ''
			}`}
		>
			<td>{item.CodigoUnico}</td>
			<td className='text-start pl-1'>{item.descripcion}</td>
			<td>
				<Button
					variant='danger'
					onClick={() => handleItemRemove(item)}
					className='mb-2'
				>
					Eliminar
				</Button>
			</td>
		</tr>
	);
};

export default CartRow;
