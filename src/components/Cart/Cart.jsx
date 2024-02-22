import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartProvider';
import { Button, Container, Table } from 'react-bootstrap';
import { exportFileXLSX } from '../../utils/Excelexport';
import CartRow from './CartRow';
import './Cart.css';
import { carritoMock } from '../../mocks/carrito';

const Cart = () => {
	const { cart, clearCart, handleSetCarrito } = useContext(CartContext);
	const [isDeleting, setIsDeleting] = useState(false);

	const exportFile = () => {
		exportFileXLSX(cart);
	};

/* 	const handleCartClean = () => {
		setIsDeleting(true);
		setTimeout(() => clearCart(), 1000);
		setIsDeleting(false);
	}; */


/* 	const handleFillCarrito = () => {
		handleSetCarrito(carritoMock);
	}; */

	const RenderComponent = () => {
		if (cart.length > 0) {
			return (
				<>
					<Table hover size='sm' className={`my-4 ${isDeleting  ? 'fade-out ' : ' '}`}>
						<thead className='border'>
							<tr className='align-middle text-center'>
								<th className='col-1'>Rº</th>
								<th className='col-2'>Codigo</th>
								<th className='col-8'>Descripcion</th>
								<th className='col-1'>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item, i) => {
								return <CartRow key={i} item={item} i={i} />;
							})}
						</tbody>
					</Table>
					<div className='mb-4'>
						<Button className='mb-2 me-3' onClick={() => clearCart()}>
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
			{/* <Button variant='primary' onClick={() => handleFillCarrito()}>
				Cargar carrito
			</Button> */}
		</Container>
	);
};

export default Cart;
