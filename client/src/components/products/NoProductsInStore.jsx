import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NoProductsInStore = () => {
	const { isAdmin } = useSelector(state => state.user);
	const navigate = useNavigate();

	return (
		<div className='text-center my-16'>
			<h2 className='text-2xl font-bold mb-4	'>
				Seems there are no items in the store yet!
			</h2>
			{isAdmin && (
				<div>
					Looks like you are an admin,{' '}
					<button
						className='px-1 border border-slate-700 rounded'
						onClick={() => navigate('/add-product')}>
						Add Products Here
					</button>
				</div>
			)}
		</div>
	);
};

export default NoProductsInStore;
