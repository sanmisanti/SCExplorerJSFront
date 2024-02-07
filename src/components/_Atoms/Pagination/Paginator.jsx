import s from './Paginator.module.scss';
import { Pagination } from 'react-bootstrap';

export const Paginator = ({ currentPage, totalPages, handlePage }) => {
	return (
		<Pagination className={s.pagination}>
			<Pagination.First
				onClick={() => handlePage(1)}
				disabled={currentPage === 1}
			/>
			<Pagination.Prev
				onClick={() => handlePage('prev')}
				disabled={currentPage === 1}
			/>
			<Pagination.Item active>{currentPage}</Pagination.Item>
			<Pagination.Next
				onClick={() => handlePage('next')}
				disabled={currentPage === totalPages}
			/>
			<Pagination.Last
				onClick={() => handlePage(totalPages)}
				disabled={currentPage === totalPages}
			/>
		</Pagination>
	);
};
