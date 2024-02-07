import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartProvider';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { exportFileXLSX } from '../../utils/Excelexport';
import CartRow from './CartRow';
import './Cart.css';
import { carritoMock } from '../../mocks/carrito';

const Cart = () => {
	const { cart, addToCart, clearCart, handleSetCarrito } =
		useContext(CartContext);
	const [isDeleting, setIsDeleting] = useState(false);

	const exportFile = () => {
		exportFileXLSX(cart);
	};

	const handleCartClean = () => {
		setIsDeleting(true);
		setTimeout(() => clearCart(), 500);
		setIsDeleting(false);
	};

	const handleFillCarrito = () => {
		handleSetCarrito(carritoMock);
	};

	const RenderComponent = () => {
		if (cart.length > 0) {
			return (
				<>
					<Table hover size='sm' className={isDeleting ? 'fade-out' : ''}>
						<thead className='border'>
							<tr className='align-middle text-center'>
								<th className='col-2'>Codigo</th>
								<th className='col-9'>Descripcion</th>
								<th className='col-1'>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{cart.map(item => {
								return <CartRow key={item.id} item={item} />;
							})}
						</tbody>
					</Table>
					<div>
						<Button className='mb-2 me-3' onClick={() => handleCartClean()}>
							Limpiar Carrito
						</Button>
						<Button
							variant='success'
							className='mb-2'
							onClick={() => exportFile()}
						>
							Exportar
						</Button>
					</div>
				</>
			);
		} else {
			return (
				<div>
					<p>No hay items en el carrito</p>
				</div>
			);
		}
	};

	return (
		<Container>
			<h1>Items Seleccionados</h1>
			<RenderComponent />
			<Button variant='primary' onClick={() => handleFillCarrito()}>
				Cargar carrito
			</Button>
		</Container>
	);
};

export default Cart;
