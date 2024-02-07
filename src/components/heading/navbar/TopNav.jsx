import s from './TopNav.module.scss';
import { useContext } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { ClasesContext } from '../../Context/ClasesProvider.jsx';
import logo from '../titles/saltaCat.png';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartProvider.jsx';

export const TopNav = () => {
	const { handleChangeMode } = useContext(ClasesContext);
	const { cart } = useContext(CartContext);

	return (
		<>
			<header className={`${s.navbar} sticky-top`}>
				<Stack className='container h-100' direction='horizontal' gap={3}>
					<Form>
						<Form.Check
							type='switch'
							id='custom-switch'
							label='ABM Mode'
							onChange={() => {
								handleChangeMode();
							}}
						></Form.Check>
					</Form>

					<div className='ms-auto d-flex align-items-center'>
						<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
							<span className='material-symbols-outlined  align-middle me-3'>
								search
							</span>
						</Link>
						<div style={{ position: 'relative', display: 'inline-block' }}>
							<Link
								to='/cart'
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								<span className='material-symbols-outlined align-middle'>
									shopping_cart
								</span>
							</Link>
							<span
								className='align-top'
								style={{
									fontSize: '10px',
									cursor: 'default',
									position: 'absolute',
									top: -5,
									right: -5,
								}}
							>
								{cart.length}
							</span>
						</div>
					</div>
				</Stack>
			</header>
			<div className='container mt-3 mb-3'>
				<img className={s.logo} src={logo} alt='Catalogo de Salta' />
			</div>
		</>
	);
};
