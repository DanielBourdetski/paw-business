import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartList from '../components/CartList';
import productService from '../services/productService';

const Cart = () => {
	const cart = useSelector(state => state.user.cart);

	return (
		<div>
			<CartList cart={cart} />
		</div>
	);
};

export default Cart;
