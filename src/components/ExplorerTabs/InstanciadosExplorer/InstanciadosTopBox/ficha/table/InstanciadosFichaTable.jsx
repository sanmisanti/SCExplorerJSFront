import s from './InstanciadosFichaTable.scss?inline';
import { Table } from 'react-bootstrap';
import { FichaSelect } from '../../../../../_Atoms/FichaSelect/FichaSelect.jsx';

const InstanciadosFichaTable = ({
	updateFiltrosValues,
	fichaFiltrosValues,
}) => {
	const { objOptions, selectedFicha } = fichaFiltrosValues;
	const objPropiedadees = selectedFicha.clasePropiedades;

	return (
		<Table className={`${s.tabla} rounded`} bordered={false} variant='light'>
			<thead>
				<tr>
					<th className='col-6'>Propiedades</th>
					<th className='col-6'>Valores</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(objPropiedadees).map((propiedadCod, i) => {
					const thisObjOptions = objOptions[propiedadCod];
					const { label, selected, viableOptions } = thisObjOptions;

					return (
						<tr key={i}>
							<td className='' data-cod={propiedadCod}>
								{label}
							</td>
							<td className={`${s.td_select}`}>
								<FichaSelect
									placeholder='Seleccionar Valor'
									name={propiedadCod}
									value={selected}
									options={viableOptions}
									label={label}
									onChange={updateFiltrosValues}
								/>
							</td>
						</tr>
					);
				})}
				{/* {fichaHeaders.propiedades.map((propiedad, i) => {
					const thisObjOptions = objOptions[propiedad.propiedadCod];
					const { label, selected, viableOptions } = thisObjOptions;

					return (
						<tr key={i}>
							<td data-cod={propiedad.propiedadCod}>{label}</td>
							<td className={`${s.td_select}`}>
								<FichaSelect
									placeholder='Seleccionar Valor'
									name={label}
									value={selected}
									options={viableOptions}
									label={label}
									onChange={e => console.log(e)}
								/>
							</td>
						</tr>
					);
				})} */}
			</tbody>
		</Table>
	);
};

export default InstanciadosFichaTable;
