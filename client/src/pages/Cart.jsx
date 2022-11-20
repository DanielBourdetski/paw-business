import { useSelector } from 'react-redux';
import CartList from '../components/CartList';

const Cart = () => {
	const cart = useSelector(state => state.user.cart);

	return (
		<div>
			<CartList cart={cart} />
		</div>
	);
};

export default Cart;
