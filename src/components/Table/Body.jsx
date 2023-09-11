import React from 'react';
import Button from 'react-bootstrap/Button';

const Body = ({ rows }) => {
	return (
		<>
			{rows.map(rubro => (
				<tr key={rubro.idClasificacion}>
					<td>{rubro.idClasificacion}</td>
					<td>{rubro.descripcion}</td>
					<td>{rubro.observacion}</td>
					<td>{rubro.claseCod}</td>
					<td>{rubro.umeCodigo}</td>
					<td>
						<Button
							variant='outline-warning'
							onClick={() => {
								alert(rubro.idClasificacion);
							}}
						>
							Explorar
						</Button>
					</td>
				</tr>
			))}
		</>
	);
};

export default Body;
