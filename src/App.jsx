import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './components/Context/ClasesProvider.jsx';
import ExplorerTabs from './components/ExplorerTabs/ExplorerTabs';
import { ClasesProvider } from './components/Context/ClasesProvider.jsx';
import { InstanciadosProvider } from './components/Context/InstanciadosProviders.jsx';
import { TopNav } from './components/heading/navbar/TopNav';
const App = () => {
	/* console.log(Clase); */

	return (
		<ClasesProvider>
			<InstanciadosProvider>
				<TopNav />
				<ExplorerTabs />
			</InstanciadosProvider>
		</ClasesProvider>
	);
};

export default App;
