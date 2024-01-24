import InstanciadosTopBox from './InstanciadosTopBox/InstanciadostTopBox.jsx';
import InstanciadosResult from './InstanciadosResultTable/InstanciadosResult.jsx';
const InstanciadosExplorerWin = () => {
	return (
		<section className=''>
			<h1 className='mb-4 mt-3'>Items Particulares</h1>
			<InstanciadosTopBox />
			<hr />
			<InstanciadosResult />
		</section>
	);
};

export default InstanciadosExplorerWin;
