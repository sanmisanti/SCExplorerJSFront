import s from './InstanciadosResult.module.scss';
import InstanciadosResultTable from './table/InstanciadosResultTable.jsx';

const InstanciadosResult = () => {
	console.log('tabla');
	return (
		<div className={`pt-3 mb-5 ${s.contenedor}`}>
			<h3 className='mb-3'>Items Encontrados</h3>
			<div className={s.Tabla}>
				<InstanciadosResultTable />
			</div>
		</div>
	);
};

export default InstanciadosResult;
