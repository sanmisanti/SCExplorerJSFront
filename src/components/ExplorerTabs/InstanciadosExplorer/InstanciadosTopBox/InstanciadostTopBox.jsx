import { useFormData } from '../../../../hooks/useFormData.jsx';
import { Spinner, Row, Col } from 'react-bootstrap';
import InstanciadosForm from './form/instanciadosForm.jsx';
import InstanciadosFicha from './ficha/InstanciadosFicha.jsx';

const InstanciadosTopBox = () => {
	const formData = useFormData();

	return (
		<>
			{!formData ? (
				<Spinner></Spinner>
			) : (
				<Row>
					<Col sm={12} md={6}>
						<InstanciadosForm />
					</Col>
					<Col sm={12} md={6}>
						<InstanciadosFicha />
					</Col>
				</Row>
			)}
		</>
	);
};

export default InstanciadosTopBox;
