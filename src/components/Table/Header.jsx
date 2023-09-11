import React from 'react';

const Header = ({ headers }) => {
	return (
		<thead>
			<tr>
				{headers.map((header, i) => (
					<th key={i}>{header}</th>
				))}
			</tr>
		</thead>
	);
};

export default Header;
