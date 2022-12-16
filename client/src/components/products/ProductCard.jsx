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
import Tags from '../common/Tags';
import ProductImage from '../common/ProductImage';

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

	const onRemoveFromCart = async id => {
		try {
			const updatedCart = await userService.removeFromCart(id);

			dispatch(userActions.updateCart(updatedCart));
			toast.success('Product removed from cart!');
		} catch (err) {
			handleError(err, 'remove product from cart');
		}
	};

	const onToggleFavorite = async id => {
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

	const onCartButtonMouseEnter = () => setCartIcon(<BsCartDash />);

	const onCartButtonMouseLeave = () => setCartIcon(<BsCartCheck />);

	return (
		<li
			className={`flex md:flex-col border border-gray-400 md:max-h-96 md:mx-4 md:h-auto py-2 md:px-2 rounded items-start object-contain z-0 ${className}`}>
			<ProductImage
				url={info.image}
				name={info.name}
				className='mx-4 md:pb-4 w-20 md:w-full md:border-b self-center justify-self max-h-[80%] md:max-h-[40%] object-contain'
			/>
			<div className='flex flex-col items-center h-full w-full p-3'>
				<div className='relative w-full flex flex-col justify-between md:flex-none'>
					<h3 className='font-semibold text-primary -z-10 relative'>
						{info.name}
					</h3>
					<p className='flex md:hidden text-green-900 font-semibold italic'>
						{info.price} <span>$</span>
					</p>
					<p className='text-sm my-2 hidden sm:block'>{info.description}</p>
				</div>

				<div
					className='flex flex-col
				 md:w-full md:items mt-auto'>
					<div className='hidden sm:block my-2'>
						<Tags tags={info.tags} />
					</div>

					<div className='flex justify-between md:w-full items-center mt-auto'>
						<div className='justify-start w-full flex mt-auto'>
							<button
								onClick={() =>
									inCart ? onRemoveFromCart(info._id) : onAddToCart(info._id)
								}
								className='border border-gray-400 hover:border-gray-600 hover:bg-slate-200 duration-150 m-1 p-1 rounded'
								onMouseEnter={onCartButtonMouseEnter}
								onMouseLeave={onCartButtonMouseLeave}>
								{inCart ? cartIcon : <BsCartPlus />}
							</button>

							<button
								onClick={() => onToggleFavorite(info._id)}
								className='border border-gray-400 hover:border-gray-600 hover:bg-slate-200 duration-150 m-1 p-1 rounded'>
								{favorite ? (
									<BsHeartFill className='text-red-500' />
								) : (
									<BsHeart />
								)}
							</button>
						</div>

						<p className='text-green-900 font-semibold italic hidden md:flex'>
							{info.price} <span>$</span>
						</p>
					</div>
				</div>
			</div>
		</li>
	);
};

export default ProductCard;
