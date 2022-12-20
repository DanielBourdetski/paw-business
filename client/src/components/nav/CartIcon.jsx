import { BsCart } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
	const cart = useSelector(state => state.user.cart);
	const navigate = useNavigate();

	const itemAmountInCart = cart.length;
	const bigNumber = cart.length > 9;

	const onCartClick = () => navigate('/cart');

	return (
		<div className='relative p-0 m-0 cursor-pointer' onClick={onCartClick}>
			<BsCart className='w-10 h-10' />
			<p
				className={`absolute top-[20%] right-[37%] text-sm font-bold ${
					bigNumber ? 'right-[20%]' : 'right-[37%]'
				}`}>
				{bigNumber ? '9+' : itemAmountInCart}
			</p>
		</div>
	);
};

export default CartIcon;
