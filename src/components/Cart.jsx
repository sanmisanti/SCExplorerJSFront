import React, { useContext } from 'react';
import { CartContext } from './Context/CartProvider';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { exportFileXLSX } from '../utils/Excelexport';

const Cart = () => {
	const { cart, addToCart, clearCart } = useContext(CartContext);

	const exportFile = () => {
		/* const cartToExport = cart.map(item => {
			const Codigo = `${item.codClase}-${item.itemCod}`;

			// Crear un nuevo objeto con 'codigo' como la primera propiedad
			const newItem = {
				Codigo,
				Descripcion: item.descripcion,
				Observacion: item.observacion,
			};

			// Eliminar las propiedades no deseadas
			delete newItem.id;
			delete newItem.codClase;
			delete newItem.esActivo;
			delete newItem.itemCod;
			delete newItem.lastModified;
			delete newItem.Clases;

			return newItem;
		}); */

		// exportToExcel(cartToExport, 'Items_Template.xlsx');

		exportFileXLSX(cart);
	};

	return (
		<Container>
			<h1>Items Seleccionados</h1>
			<Table>
				<thead>
					<tr className='align-middle text-center'>
						<th className='col-1'>Codigo</th>
						<th className='col-'>Descripcion</th>
						<th className='col-1'>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{cart.map(item => {
						return (
							<tr
								key={item.id}
								className='align-middle text-center table-success'
							>
								<td>{`${item.codClase}-${item.itemCod}`}</td>
								<td className='text-start pl-1'>{item.descripcion}</td>
								<td>
									<Button
										variant='danger'
										onClick={() => addToCart(item)}
										className='mb-2'
									>
										Eliminar
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{cart.length > 0 && (
				<div>
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
			)}
		</Container>
	);
};

export default Cart;
