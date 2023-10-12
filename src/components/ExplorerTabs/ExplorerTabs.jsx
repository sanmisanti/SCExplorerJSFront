import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GenericosExplorerWin from './GenericosExplorer/GenericosExplorerWin';
import InstanciadosExplorerWin from './InstanciadosExplorer/InstanciadosExplorerWin';
import s from './ExplorerTabs.module.scss';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { ClasesContext } from '../Context/ClasesProvider';

const ExplorerTabs = () => {
	const { handleChangeMode } = useContext(ClasesContext);

	return (
		<Container className={s.container}>
			<Form>
				<Form.Check
					type='switch'
					id='custom-switch'
					label='Agregar clase'
					onChange={() => {
						handleChangeMode();
					}}
				></Form.Check>
			</Form>
			<Tabs defaultactivekey='genericos' id='mainTabs' className='mb-3'>
				<Tab eventKey='genericos' title='Genericos'>
					<GenericosExplorerWin />
				</Tab>
				<Tab eventKey='instanciados' title='Instanciados'>
					<InstanciadosExplorerWin />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default ExplorerTabs;
