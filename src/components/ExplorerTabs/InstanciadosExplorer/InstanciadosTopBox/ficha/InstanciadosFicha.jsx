import { useContext } from 'react';
import { Table, Form, Stack, Spinner } from 'react-bootstrap';
import { InstanciadosContext } from '../../../../Context/InstanciadosProviders';
import s from './instanciadosFicha.module.scss';
import { SaltaSelect } from '../../../../_Atoms/SaltaSelect.jsx';

const InstanciadosFicha = () => {
	const { fichaFiltrosValues } = useContext(InstanciadosContext);
	const { objClase } = fichaFiltrosValues;
	const spanAlertClassName = objClase.error
		? s.span_ingrese_error
		: objClase.descripcion
		? s.span_ingrese_succes
		: s.span_ingrese_base;

	console.log(objClase);

	return (
		<>
			<Stack direction='horizontal' gap={3}>
				<Form.Label>Ficha: </Form.Label>
				<div className='mb-2'>
					{objClase.loading ? (
						<Spinner animation='border' />
					) : (
						<span className={`${s.span_ingrese} ${spanAlertClassName}`}>
							{objClase.descripcion ||
								(objClase.error
									? 'Código Incorrecto'
									: 'Ingrese un Código de Item Genérico')}
							<span className='material-symbols-outlined'>barcode</span>
						</span>
					)}
				</div>
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
						{!objClase.claseCod || objClase.loading || objClase.error ? (
							<tr>
								<td colSpan={2}>
									Ingrese un Codigo de Item Generico para Buscar propiedades
								</td>
							</tr>
						) : (
							objClase.propiedades.map((propiedad, i) => (
								<tr key={i}>
									<td data-cod={propiedad.propiedadCod}>
										{propiedad.descripcion}
									</td>
									<td>
										<SaltaSelect
											placeholder='Rubro'
											name='rubros'
											value={{ value: '1', label: '1' }}
											options={[{ value: '1', label: '1' }]}
											onChange={e => console.log(e)}
										/>
									</td>
								</tr>
							))
						)}

						{/* <tr>
							<td>xx</td>
							<td>
								
							</td>
						</tr> */}
					</tbody>
				</Table>
			</div>
		</>
	);
};

export default InstanciadosFicha;
