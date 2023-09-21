import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GenericosExplorerWin from './GenericosExplorer/GenericosExplorerWin';
import s from './ExplorerTabs.module.scss';
import { Container } from 'react-bootstrap';

const ExplorerTabs = () => {
	return (
		<Container className={s.container}>
			<Tabs defaul tActiveKey='genericos' id='mainTabs' className='mb-3'>
				<Tab eventKey='genericos' title='Genericos'>
					<GenericosExplorerWin />
				</Tab>
				<Tab eventKey='instanciados' title='Instanciados'>
					ACA Irian los instanciados
				</Tab>
			</Tabs>
		</Container>
	);
};

export default ExplorerTabs;
