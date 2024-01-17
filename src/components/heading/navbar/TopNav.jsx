import s from './TopNav.module.scss';
import { useContext } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { ClasesContext } from '../../Context/ClasesProvider.jsx';
import logo from '../titles/saltaCat.png';
export const TopNav = () => {
	const { handleChangeMode } = useContext(ClasesContext);
	return (
		<>
			<header className={s.navbar}>
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

					<div className='ms-auto'>
						<span>Login</span>
					</div>
				</Stack>
			</header>
			<div className='container mt-3 mb-3'>
				<img className={s.logo} src={logo} alt='Catalogo de Salta' />
			</div>
		</>
	);
};
