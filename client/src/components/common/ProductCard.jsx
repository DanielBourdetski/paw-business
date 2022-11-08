import { useDispatch, useSelector } from 'react-redux';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import { userActions } from '../../store/store';

const ProductCard = ({ className = '', info, inCart }) => {
	const { favorites = [] } = useSelector(state => state.user);

	const dispatch = useDispatch();

	const onAddToCart = async id => {
		try {
			const updatedCart = await userService.addToCart(id);

			dispatch(userActions.updateCart(updatedCart));
		} catch (err) {
			toast.error(
				err.message ||
					'An unexpected error has occured, please refresh and try again.'
			);
		}
	};

	const onAddToFavorites = async id => {
		try {
			const updatedFavorites = await userService.toggleFavorite(id);
			dispatch(userActions.updateFavorites(updatedFavorites));

			toast.success(
				updatedFavorites.includes(id)
					? 'Added to favorites!'
					: 'Removed from favorites!',
				{
					autoClose: 1000,
					hideProgressBar: true,
				}
			);
		} catch (err) {
			// TODO handle error
			toast.error(err.message || 'Could not add to favorites');
		}
	};

	const isProductInFavorites = favorites.includes(info._id);
	return (
		<li
			className={`flex flex-col border border-gray-400 m-4 rounded items-start ${className}`}>
			<h3 className='font-semibold text-primary'>{info.name}</h3>

			<div className='flex'>
				<p>{info.description}</p>
				<p>{info.price}</p>
			</div>

			<p>
				Tags:{' '}
				{info.tags.map(t => (
					<span key={t}>{t + ' '}</span>
				))}
			</p>
			<div className='self-end flex mt-auto'>
				<button className='border border-gray-400 hover:border-gray-600 hover:bg-slate-200 duration-150 m-1 p-1 rounded'>
					Buy now
				</button>

				<button
					onClick={() => onAddToCart(info._id)}
					className='border border-gray-400 hover:border-gray-600 hover:bg-slate-200 duration-150 m-1 p-1 rounded'>
					{inCart ? 'In cart' : 'Add to cart'}
				</button>

				<button
					// ! doesnt work
					onClick={() => onAddToFavorites(info._id)}
					className={`border border-gray-400 hover:border-gray-600 hover:bg-slate-200 duration-150 m-1 p-1 rounded ${
						isProductInFavorites && 'bg-slate-300'
					}`}>
					{'<3'}
				</button>
			</div>
		</li>
	);
};

export default ProductCard;
