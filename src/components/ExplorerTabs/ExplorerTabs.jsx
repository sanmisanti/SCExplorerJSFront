import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GenericosExplorerWin from './GenericosExplorer/GenericosExplorerWin';
import InstanciadosExplorerWin from './InstanciadosExplorer/InstanciadosExplorerWin';
import s from './ExplorerTabs.module.scss';
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../Context/CartProvider';

const ExplorerTabs = () => {
	const { lastPage } = useContext(CartContext);

	return (
		<Container className={s.container}>
			<Tabs
				defaultActiveKey={lastPage}
				id='mainTabs'
				className='mb-3 justify-content-end'
			>
				<Tab eventKey='genericos' title='Genéricos'>
					<GenericosExplorerWin />
				</Tab>
				<Tab eventKey='particulares' title='Particulares'>
					<InstanciadosExplorerWin />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default ExplorerTabs;
