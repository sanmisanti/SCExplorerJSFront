import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GenericosInputBox from './GenericosInputBox/GenericosInputBox.jsx';
import GenericosResultTable from './GenericosResultTable/GenericosResultTable.jsx';
import ABMClase from '../../ABMClase/ABMClase.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { ClasesContext } from '../../Context/ClasesProvider';

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
					<GenericosInputBox />
					<GenericosResultTable headers={headers} />
				</>
			)}
		</section>
	);
};

export default GenericosExplorerWin;
