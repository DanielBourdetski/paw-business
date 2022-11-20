import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productService from '../services/productService';
import ProductList from './common/ProductList';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';

const CartAndFavs = () => {
	const [lists, setLists] = useState({ cart: null, favourites: null });
	const [loading, setLoading] = useState(true);

	const handleError = useHandleError();

	const { cart: cartIds = [], favourites: favsIds = [] } = useSelector(
		state => state.user
	);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const cart = await productService.getMultipleProductsInfo(
					cartIds.map(p => p.product)
				);
				const favourites = await productService.getMultipleProductsInfo(
					favsIds
				);

				setLists({ cart, favourites });
				setLoading(false);
			} catch (err) {
				return handleError(err, 'fetch favorites and cart');
			}
		};

		fetchProducts();
	}, []);

	if (loading) return <p>LOADING...</p>;

	return (
		<div>
			{!!lists.cart.length && (
				<>
					<h2>My Cart</h2>
					<ProductList products={lists.cart} />{' '}
				</>
			)}

			{!!lists.favourites.length && (
				<>
					<h2>Favourites</h2>
					<ProductList products={lists.favourites} />{' '}
				</>
			)}
		</div>
	);
};

export default CartAndFavs;
