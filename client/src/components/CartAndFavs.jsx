import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productService from '../services/productService';
import ProductList from './common/ProductList';
import { toast } from 'react-toastify';

const CartAndFavs = () => {
	const [lists, setLists] = useState({ cart: null, favourites: null });
	const [loading, setLoading] = useState(true);

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
				return toast.error(err.message || 'An unexpected error has occured');
			}
		};

		fetchProducts();
	}, []);

	if (loading) return <p>LOADING...</p>;

	return (
		<div>
			{lists.cart && (
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
