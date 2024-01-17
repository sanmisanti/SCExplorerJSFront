import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {
	getAllClases,
	getClasesFilter,
} from '../../../../services/claseService';
import { ClasesContext } from '../../../Context/ClasesProvider';
import './GenericosInputBox.css';

const GenericosInputBox = () => {
	const [filtro, setFiltro] = useState('');
	const { handleSetClasesToShow, handleSetPage, page } =
		useContext(ClasesContext);
	/* 	const newWindow = window.open(
		'',
		'_blank',
		'width=600,height=400,top=100,left=100'
	); */

	const filtrar = () => {
		if (filtro === '') {
			getAllClases(1)
				.then(initialClases => {
					handleSetClasesToShow(initialClases.rows);
				})
				.catch(error => {
					alert(error);
				});
		} else {
			getClasesFilter(filtro)
				.then(initialClases => {
					console.log('FILTTRADAS: ', initialClases);
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

	const handlePagechange = newPage => {
		handleSetPage(newPage);
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
			</div>
		</div>
	);
};

export default GenericosInputBox;
