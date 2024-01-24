import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GenericosInputBox from './GenericosInputBox/GenericosInputBox.jsx';
import GenericosResultTable from './GenericosResultTable/GenericosResultTable.jsx';
import ABMClase from '../../ABMClase/ABMClase.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { ClasesContext } from '../../Context/ClasesProvider';
import InstanciadosForm from '../InstanciadosExplorer/InstanciadosTopBox/form/instanciadosForm.jsx';
import InstanciadosResult from '../InstanciadosExplorer/InstanciadosResultTable/InstanciadosResult.jsx';
import { Row } from 'react-bootstrap';

const GenericosExplorerWin = () => {
	const { modoInsercion } = useContext(ClasesContext);

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
			{modoInsercion ? (
				<ABMClase />
			) : (
				<>
					<Row>
						<InstanciadosForm isInstanciado={false} />
					</Row>
					<InstanciadosResult />
					{/*<GenericosInputBox />
					<GenericosResultTable headers={headers} /> */}
				</>
			)}
		</section>
	);
};

export default GenericosExplorerWin;
