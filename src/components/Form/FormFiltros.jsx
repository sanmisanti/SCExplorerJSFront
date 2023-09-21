import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import claseService from '../../services/claseService';
import { ClasesContext } from '../Context/ClasesProvider';
import Popup from 'reactjs-popup';
import ABMClase from '../ABMClase/ABMClase';
import './FormFiltros.css';

const FormFiltros = () => {
	const [filtro, setFiltro] = useState('');
	const { handleSetClasesToShow } = useContext(ClasesContext);

	const filtrar = () => {
		if (filtro === '') {
			claseService
				.getAllClases()
				.then(initialClases => {
					handleSetClasesToShow(initialClases);
				})
				.catch(error => {
					alert(error);
				});
		} else {
			claseService
				.getClasesFilter(filtro)
				.then(initialClases => {
					handleSetClasesToShow(initialClases);
				})
				.catch(error => {
					alert(error);
				});
		}
	};

	const handleChange = value => {
		setFiltro(value);
	};

	return (
		<div>
			<h1>Busqueda de Item Generico</h1>
			<div className='d-flex flex-row'>
				<FloatingLabel
					controlId='floatingInput'
					label='Item Genérico'
					className='w-50 h-100'
				>
					<Form.Control
						value={filtro}
						className=' mr-5'
						type='text'
						placeholder='itemGenerico'
						onChange={e => {
							handleChange(e.target.value);
						}}
					/>
				</FloatingLabel>
				<Button
					className='me-100'
					variant='primary'
					onClick={() => {
						filtrar();
					}}
				>
					Buscar
				</Button>
				<div className=' my-3 d-flex justify-content-end'>
					<Popup
						className='popup-content'
						trigger={
							<button type='button' className='btn btn-success'>
								Add New
							</button>
						}
						modal
					>
						<ABMClase />
					</Popup>
				</div>
			</div>
		</div>
	);
};

export default FormFiltros;
