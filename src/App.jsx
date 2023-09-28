import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './components/Context/ClasesProvider.jsx';
import ExplorerTabs from './components/ExplorerTabs/ExplorerTabs';
import { ClasesProvider } from './components/Context/ClasesProvider.jsx';
const App = () => {
	/* console.log(Clase); */

	return (
		<ClasesProvider>
			<ExplorerTabs />
		</ClasesProvider>
	);
};

export default App;
