import 'bootstrap/dist/css/bootstrap.min.css';
import TablaResultado from './components/Table/TablaResultado';
import './styles/index.css';
import FormFiltros from './components/Form/FormFiltros';
import { ClasesProvider } from './components/Context/ClasesProvider.jsx';

const App = () => {
	/* console.log(Clase); */
	const headers = [
		'ID',
		'Descripción',
		'Observación',
		'Codigo',
		'UnidadM',
		'Explorar',
	];

	return (
		<div>
			<ClasesProvider>
				<FormFiltros />
				<TablaResultado headers={headers} />
			</ClasesProvider>
		</div>
	);
};

export default App;
