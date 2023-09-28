import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import instanciasService from '../../../../services/instanciasService';
import { pickedClase } from '../../../Context/ClasesProvider';
import { Stack } from 'react-bootstrap';
import { useRef } from 'react';

const InstanciadosInputBox = () => {
	const inpPickedClase = useRef();

	const traerFicha = () => {
		const inpPickedClase = inpPickedClase.current;
		const pickedClase = inpPickedClase.value;
		if (!pickedClase) return;
		instanciasService.getInstanciasByClase(pickedClase);
	};

	return (
		<Stack direction='horizontal' gap={3} className='mb-3'>
			<FloatingLabel
				controlId='claseCodForInstanciados'
				label='Codigo de Clase / Item Generico'
				className='mb-3'
			>
				<Form.Control
					type='number'
					value={pickedClase.cod}
					ref={inpPickedClase}
				/>
			</FloatingLabel>
			<Button
				onClick={traerFicha}
				variant='primary'
				disabled={!pickedClase.cod}
			>
				📝 Ficha
			</Button>
			<div className='w-100'>Esto sera la ficha</div>
		</Stack>
	);
};

export default InstanciadosInputBox;
