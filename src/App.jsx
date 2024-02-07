import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './components/Context/ClasesProvider.jsx';
import ExplorerTabs from './components/ExplorerTabs/ExplorerTabs';
import { ClasesProvider } from './components/Context/ClasesProvider.jsx';
import { InstanciadosProvider } from './components/Context/InstanciadosProviders.jsx';
import { TopNav } from './components/heading/navbar/TopNav';
import { Footer } from './components/Footer/Footer.jsx';
import { CartProvider } from './components/Context/CartProvider.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart.jsx';
import { useEffect, useState } from 'react';
import ScrollToTop from './components/ScrollToTop.jsx';

const App = () => {
	return (
		<>
			<div style={{ minHeight: '100vh' }}>
				<CartProvider>
					<ClasesProvider>
						<InstanciadosProvider>
							<Router>
								<TopNav />
								<ScrollToTop />
								<Routes>
									<Route path='/' exact element={<ExplorerTabs />} />
									<Route path='/cart' element={<Cart />} />
								</Routes>
							</Router>
						</InstanciadosProvider>
					</ClasesProvider>
				</CartProvider>
			</div>
			<Footer />
		</>
	);
};

export default App;
