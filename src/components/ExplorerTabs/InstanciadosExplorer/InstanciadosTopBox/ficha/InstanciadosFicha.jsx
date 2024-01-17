import { useContext } from 'react';
import { Table, Form, Stack, Spinner } from 'react-bootstrap';
import { InstanciadosContext } from '../../../../Context/InstanciadosProviders';
import s from './instanciadosFicha.module.scss';

const InstanciadosFicha = () => {
	const { fichaFiltrosValues } = useContext(InstanciadosContext);
	const { objClase } = fichaFiltrosValues;

	return (
		<>
			<Stack direction='horizontal' gap={3}>
				<Form.Label>Ficha: </Form.Label>
				<span className='mb-2'>
					{objClase.loading ? (
						<Spinner animation='border' />
					) : objClase.error ? (
						<span className='text-danger'>Codigo Incorrecto</span>
					) : (
						<span className='btn btn-success'>{objClase.descripcion}</span> ||
						'Ingrese un Código de Clase'
					)}
				</span>
			</Stack>
			<div className={`${s.tabla_container} rounded`}>
				<Table
					className={`${s.tabla} rounded`}
					striped
					bordered={false}
					hover
					variant=''
				>
					<thead>
						<tr>
							<th>Propiedades</th>
							<th>Valores</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>xx</td>
							<td>
								<select name='' id=''>
									<option value=''>Hihi</option>
								</select>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</>
	);
};

export default InstanciadosFicha;
