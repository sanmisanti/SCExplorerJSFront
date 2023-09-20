import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import rubroService from '../../services/rubroService';

const ABMClase = () => {
	const [rubros, setRubros] = useState([]);

	useEffect(() => {
		return () => {
			rubroService.getAllRubros().then(rubros => setRubros(rubros));
		};
	}, []);

	console.log('Rubros', rubros);

	return (
		<div className='d-flex flex-column align-items-center bk-white'>
			<div className='d-flex flex-wrap w-100 justify-content-center'>
				<div className='col-1 w-5'>Rubro</div>
				<div className='col-4 w-5'>
					<Select options={rubros} defaultValue={''} />
				</div>
				<div className='col-4 w-5'>gl</div>
			</div>
		</div>
	);
};

export default ABMClase;
