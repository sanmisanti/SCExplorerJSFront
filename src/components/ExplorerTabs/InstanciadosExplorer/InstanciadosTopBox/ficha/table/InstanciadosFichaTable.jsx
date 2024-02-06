import s from './InstanciadosFichaTable.module.scss';
import { Table } from 'react-bootstrap';
import { FichaSelect } from '../../../../../_Atoms/FichaSelect/FichaSelect.jsx';
import { useEffect, useRef } from 'react';

const InstanciadosFichaTable = ({
	updateFiltrosValues,
	fichaFiltrosValues,
}) => {
	const { objOptions, selectedFicha } = fichaFiltrosValues;
	const objPropiedadees = selectedFicha.clasePropiedades;

	const updateMenuPosition = () => {
		const menu = document.querySelector('.ficha-select__menu');
		if (!menu) {
			return;
		}

		const parent = menu.parentElement;
		const positions = parent.getBoundingClientRect();

		const scrolableFrame = scrollableTable.current.getBoundingClientRect();
		if (
			scrolableFrame.top > positions.top ||
			scrolableFrame.bottom < positions.bottom
		) {
			menu.style.display = 'none';
			return;
		}
		menu.style.display = 'block';

		const top = positions.top + positions.height;
		const left = positions.left;

		menu.style.top = `${top}px`;
		menu.style.left = `${left}px`;
	};

	const scrollableTable = useRef(null);

	useEffect(() => {
		document.addEventListener('scroll', updateMenuPosition);
		const scrollable = scrollableTable.current;
		scrollable.addEventListener('scroll', updateMenuPosition);

		return () => {
			document.removeEventListener('scroll', updateMenuPosition);
			scrollable.removeEventListener('scroll', updateMenuPosition);
		};
	}, []);

	return (
		<>
			{' '}
			<Table className={`mb-0 ${s.headers}`}>
				<thead>
					<tr className=''>
						<th className='col-6'>Propiedad</th>
						<th className='col-6'>Valor</th>
					</tr>
				</thead>
			</Table>
			<div className={s.tablaScrolleable} ref={scrollableTable}>
				<Table className={`${s.tabla}`} variant='light'>
					<tbody>
						{Object.keys(objPropiedadees).map((propiedadCod, i) => {
							const thisObjOptions = objOptions[propiedadCod];
							const { label, selected, viableOptions } = thisObjOptions;

							return (
								<tr key={i}>
									<td
										className='text-end align-middle col-6'
										data-cod={propiedadCod}
									>
										{label}
									</td>
									<td className={`${s.td_select} col-6`}>
										<FichaSelect
											classNamePrefix='ficha-select'
											className={`ficha-select-${propiedadCod}`}
											placeholder='Seleccionar Valor'
											name={propiedadCod}
											value={selected}
											options={viableOptions}
											onChange={updateFiltrosValues}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</>
	);
};

export default InstanciadosFichaTable;
