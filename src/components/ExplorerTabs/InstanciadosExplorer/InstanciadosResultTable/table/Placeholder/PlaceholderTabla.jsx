import { Placeholder } from 'react-bootstrap';

const PlaceHolderTable = ({ pageSize, s }) => {
	return Array(pageSize)
		.fill(0)
		.map((empty, i) => {
			return (
				<tr key={i}>
					<td>
						<Placeholder as='span' className={s.edit} animation='wave'>
							<Placeholder xs={8} bg='' />
						</Placeholder>
					</td>
					<td>
						<Placeholder as='span' className={s.edit} animation='wave'>
							<Placeholder xs={8} bg='' />
						</Placeholder>
					</td>
					<td>
						<Placeholder
							as='span'
							className={s.placeholderDesc}
							animation='wave'
						>
							<Placeholder
								className='ms-2'
								xs={Math.floor(Math.random() * 4) + 1}
								bg=''
							/>
							<Placeholder
								className='ms-2'
								xs={Math.floor(Math.random() * 6) + 1}
								bg=''
							/>
							<Placeholder
								className='ms-2'
								xs={Math.floor(Math.random() * 3) + 1}
								bg=''
							/>
						</Placeholder>
					</td>
					<td>
						<Placeholder as='span' className={s.edit} animation='wave'>
							<Placeholder xs={5} bg='' />
						</Placeholder>
					</td>
				</tr>
			);
		});
};

export default PlaceHolderTable;
