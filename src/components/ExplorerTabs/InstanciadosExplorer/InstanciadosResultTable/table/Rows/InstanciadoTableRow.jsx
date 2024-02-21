import {
	Badge,
	Button,
	Form,
	InputGroup,
	Card,
	Collapse,
} from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import rowStyles from './InstanciadoTableRow.module.scss';
const InstanciadosTableRow = ({
	item,
	i,
	style,
	cantidadEnCarrito,
	addToCart,
	removeFromCart,
	setNewCantidad,
	s,
}) => {
	const inpRef = useRef();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);
	const toggleShow = () => setShow(!show);

	const handleCloseWhenClickOutside = e => {
		const target = e.target;
		const setCantidadDropdown = target.closest(`#collapse${i}`);
		const botonCarrito = target.closest(`#btnCarrito-${i}`);
		if (!botonCarrito && !setCantidadDropdown && show) {
			handleClose();
		}
	};

	useEffect(() => {
		window.addEventListener('click', handleCloseWhenClickOutside);

		return () =>
			window.removeEventListener('click', handleCloseWhenClickOutside);
	});

	return (
		<tr key={i} className={`${style} ${s.row}`}>
			<td>
				{cantidadEnCarrito > 0 ? (
					<span className={rowStyles.carritoCell}>
						<Button
							id={`btnCarrito-${i}`}
							onClick={toggleShow}
							aria-controls={`collapse${i}`}
							aria-expanded={show}
							className={rowStyles.boton}
							variant='outline-secondary'
						>
							<span className={rowStyles.iconWrapper}>
								<span className={'material-symbols-outlined ' + rowStyles.icon}>
									shopping_cart
								</span>
								<Badge pill bg='danger' className={rowStyles.badge}>
									{cantidadEnCarrito}
								</Badge>
							</span>
						</Button>
						<Collapse in={show}>
							<div
								id={`collapse${i}`}
								className={`${rowStyles.setCantidadesCard}`}
							>
								<Card>
									<Card.Body className={rowStyles.cardBody}>
										<InputGroup size='sm' className={rowStyles.inputGroup}>
											<Form.Control
												placeholder={cantidadEnCarrito}
												type='number'
												ref={inpRef}
												onChange={e => {
													const value = parseInt(e.target.value);
													if (value > 999) {
														e.target.value = 999;
													}
													if (value < 0) {
														e.target.value = 0;
													}
													console.log(e.target.value);
												}}
											/>
											<Button
												variant='secondary'
												onClick={() => {
													const inp = inpRef.current;
													let value = parseInt(inp.value);
													if (!value) {
														handleClose();
														return;
													}
													value = inp.value;
													console.log(value);
													setNewCantidad({
														item,
														cantidadTotal: value,
													});
													inp.value = '';
													handleClose();
												}}
											>
												<span className='material-symbols-outlined d-flex'>
													play_arrow
												</span>
											</Button>
										</InputGroup>

										<Button
											variant='danger'
											size='sm'
											className={'d-flex ' + rowStyles.btnClear}
											onClick={() => {
												setNewCantidad({
													item,
													cantidadTotal: 0,
												});
												handleClose();
											}}
										>
											<span className='material-symbols-outlined'>delete</span>{' '}
											Quitar
										</Button>
									</Card.Body>
								</Card>
							</div>
						</Collapse>
					</span>
				) : (
					'-'
				)}
			</td>
			<td>{`${item.CodigoUnico}`}</td>
			<td className={s.descripcion}>{item.descripcion}</td>
			<td>
				<span className={s.edit}>
					<Button
						variant='outline-success btn-sm'
						onClick={() => addToCart({ item })}
					>
						<span className='material-symbols-outlined'>add</span>
					</Button>
					<Button
						variant={`${
							cantidadEnCarrito <= 0 ? 'outline-secondary' : 'outline-danger'
						} btn-sm `}
						onClick={() => {
							removeFromCart({ item });
						}}
						disabled={cantidadEnCarrito <= 0}
					>
						<span className='material-symbols-outlined'>
							{cantidadEnCarrito > 1 ? 'remove' : 'delete'}
						</span>
					</Button>
				</span>
			</td>
		</tr>
	);
};

export default InstanciadosTableRow;
