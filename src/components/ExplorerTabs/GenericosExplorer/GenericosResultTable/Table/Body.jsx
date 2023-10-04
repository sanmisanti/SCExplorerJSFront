import Button from 'react-bootstrap/Button';

const Body = ({ rows }) => {
	const handleClick = ({ idClasificacion }) => {
		window.open('https://www.google.com', '_blank');
	};

	return (
		<tbody>
			{rows.map(rubro => (
				<tr key={rubro.claseCod}>
					<td>{rubro.claseCod}</td>
					<td>{rubro.descripcion}</td>
					<td>{rubro.observacion}</td>
					<td>{rubro.claseCod}</td>
					<td>{rubro.umeCodigo}</td>
					<td>
						<Button
							variant='outline-warning'
							onClick={() => {
								handleClick({ idClasificacion: rubro.idClasificacion });
							}}
						>
							Explorar
						</Button>
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default Body;
