import GenericosInputBox from './GenericosInputBox/GenericosInputBox.jsx';
import GenericosResultTable from './GenericosResultTable/GenericosResultTable.jsx';

const GenericosExplorerWin = () => {
	const headers = [
		'ID',
		'Descripción',
		'Observación',
		'Codigo',
		'UnidadM',
		'Explorar',
	];

	return (
		<section>
			<GenericosInputBox />
			<GenericosResultTable headers={headers} />
		</section>
	);
};

export default GenericosExplorerWin;
