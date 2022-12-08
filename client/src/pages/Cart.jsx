import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartList from '../components/CartList';

const Cart = () => {
	const cart = useSelector(state => state.user.cart);
	const navigate = useNavigate();

	if (cart.length === 0)
		return (
			<div className='w-2/3 mx-auto flex flex-col mt-32 justify-center items-center gap-y-10'>
				<h2 className='w-full text-center text-4xl'>
					Whoops, no products here
				</h2>
				<button
					onClick={() => navigate('/products')}
					className='px-6 py-2 mx-auto border rounded-full bg-green-400 text-green-900 font-semibold hover:bg-green-500'>
					Products for your pet right through here --{'>'}
				</button>
			</div>
		);

	return (
		<div>
			<CartList cart={cart} />
		</div>
	);
};

export default Cart;
