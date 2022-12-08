import { useDispatch } from 'react-redux';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import { userActions } from '../../store/store';
import useHandleError from '../../hooks/useHandleError';
import {
	BsCartCheck,
	BsCartDash,
	BsCartPlus,
	BsHeart,
	BsHeartFill,
} from 'react-icons/bs';
import { useState } from 'react';
import Tags from './Tags';

const ProductCard = ({ className = '', info, inCart, favorite }) => {
	const [cartIcon, setCartIcon] = useState(<BsCartCheck />);

	const dispatch = useDispatch();
	const handleError = useHandleError();

	const onAddToCart = async id => {
		try {
			const updatedCart = await userService.addToCart(id);

			dispatch(userActions.updateCart(updatedCart));
			toast.success('Product added to cart', {
				autoClose: 1000,
				hideProgressBar: true,
			});
		} catch (err) {
			handleError(err, 'add product to cart');
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
				{ autoClose: 1000, hideProgressBar: true }
			);
		} catch (err) {
			toast.error(err.message || 'Could not add to favorites');
		}
	};

	const onImageError = e => {
		e.target.onerror = null; // prevents this function to loop
		e.target.src = process.env.PUBLIC_URL + '/images/Paw-Business-logo.png';
	};

	const onCartButtonMouseEnter = () => setCartIcon(<BsCartDash />);

	const onCartButtonMouseLeave = () => setCartIcon(<BsCartCheck />);

	return (
		<li
			className={`flex flex-col border border-gray-400 m-4 py-2 px-2 rounded items-start ${className}`}>
			<img
				// TODO figure out how to replcae broken image links with defaults
				className='mx-4 pb-4 w-full border-b h-min self-center max-h-[50%] object-contain'
				src={info.image}
				alt={info.name}
				onError={onImageError}
			/>
			<div className='flex flex-col h-full w-full p-3'>
				<div className='relative w-full'>
					<h3 className='font-semibold text-primary'>{info.name}</h3>
					<p className='absolute right-0 -top-10'>{info.price}</p>
				</div>

				<p className='text-sm my-2'>{info.description}</p>

				<p className='mt-auto'>
					<Tags tags={info.tags} />
				</p>

				<div className='self-center justify-self-end w-full flex mt-auto justify-between'>
					<button
						onClick={() => onAddToCart(info._id)}
						className='border border-gray-400 hover:border-gray-600 hover:bg-slate-200 duration-150 m-1 p-1 rounded'
						onMouseEnter={onCartButtonMouseEnter}
						onMouseLeave={onCartButtonMouseLeave}>
						{inCart ? cartIcon : <BsCartPlus />}
					</button>

					<button
						onClick={() => onAddToFavorites(info._id)}
						className='border border-gray-400 hover:border-gray-600 hover:bg-slate-200 duration-150 m-1 p-1 rounded'>
						{favorite ? <BsHeartFill className='text-red-500' /> : <BsHeart />}
					</button>
				</div>
			</div>
		</li>
	);
};

export default ProductCard;
