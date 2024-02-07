import { Table, Button, Placeholder } from 'react-bootstrap';
import s from './InstanciadosResultTable.module.scss';
import { useCart } from '../../../../../hooks/useCart.js';
const InstanciadosResultTable = ({ itemsToRender, loading, pageSize }) => {
	const { addToCart, cart } = useCart();

	return (
		<>
			<Table bordered hover size='sm' className='table-responsive-sm'>
				<thead>
					<tr className='align-middle text-center'>
						<th className='col-1'>Carrito</th>
						<th className='col-2'>Codigo</th>
						<th className='col-9'>Descripcion</th>
						<th className='col-1'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{loading
						? Array(pageSize)
								.fill(0)
								.map((empty, i) => {
									return (
										<tr key={i}>
											<td>
												<Placeholder
													as='span'
													className={s.edit}
													animation='wave'
												>
													<Placeholder xs={8} bg='' />
												</Placeholder>
											</td>
											<td>
												<Placeholder
													as='span'
													className={s.edit}
													animation='wave'
												>
													<Placeholder xs={8} bg='' />
												</Placeholder>
											</td>
											<td>
												<Placeholder
													as='span'
													className={s.placeholderDesc}
													animation='wave'
												>
													<Placeholder
														className='ms-2'
														xs={Math.floor(Math.random() * 4) + 1}
														bg=''
													/>
													<Placeholder
														className='ms-2'
														xs={Math.floor(Math.random() * 6) + 1}
														bg=''
													/>
													<Placeholder
														className='ms-2'
														xs={Math.floor(Math.random() * 3) + 1}
														bg=''
													/>
												</Placeholder>
											</td>
											<td>
												<Placeholder
													as='span'
													className={s.edit}
													animation='wave'
												>
													<Placeholder xs={5} bg='' />
												</Placeholder>
											</td>
										</tr>
									);
								})
						: itemsToRender.map((item, i) => {
								const style = cart.find(cartItem => cartItem.id === item.id)
									? 'align-middle text-center table-info '
									: 'align-middle text-center table-light';
								return (
									<tr
										key={i}
										className={style}
										style={{ cursor: 'pointer' }}
										onClick={() => addToCart(item)}
									>
										<td>
											<span className={'material-symbols-outlined ' + s.onCart}>
												remove_shopping_cart
											</span>
										</td>
										<td>{item.CodigoUnico}</td>
										<td className={s.descripcion}>{item.descripcion}</td>
										<td>
											<span className={s.edit}>
												<Button variant='light btn-sm'>+</Button>
											</span>
										</td>
									</tr>
								);
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })}
				</tbody>
			</Table>
		</>
	);
};

export default InstanciadosResultTable;

// itemsToRender.map((item, i) => {
// 								return (
// 									<tr key={i} className='align-middle text-center'>
// 										<td>Ok</td>
// 										<td>{`${item.codClase}-${item.itemCod}`}</td>
// 										<td className={s.descripcion}>{item.descripcion}</td>
// 										<td>
// 											<span className={s.edit}>
// 												<Button variant='light'>✏️</Button>
// 											</span>
// 										</td>
// 									</tr>
// 								);
// 						  })
