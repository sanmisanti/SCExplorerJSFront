import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Popup from 'reactjs-popup';

import claseService from '../../../../services/claseService';
import { ClasesContext } from '../../../Context/ClasesProvider';
import ABMClase from '../../../ABMClase/ABMClase';
import './GenericosInputBox.css';

import { createPortal } from 'react-dom';

const GenericosInputBox = () => {
	const [filtro, setFiltro] = useState('');
	const { handleSetClasesToShow } = useContext(ClasesContext);
	/* 	const newWindow = window.open(
		'',
		'_blank',
		'width=600,height=400,top=100,left=100'
	); */

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
			<div className='d-flex flex-row gap-2'>
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
				{/* <Button
					className='me-100'
					variant='warning'
					onClick={() =>
						window.open('http://localhost:5173/ABMClase', '_blank')
					}
				>
					Agregar nuevo
				</Button> */}
				<Popup
					trigger={
						<Button className='me-100' variant='warning'>
							Agregar nuevo
						</Button>
					}
					modal
				>
					<ABMClase />
				</Popup>
			</div>
		</div>
	);
};

export default GenericosInputBox;
