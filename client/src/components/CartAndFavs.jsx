import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productService from '../services/productService';
import ProductList from './products/ProductList';
import useHandleError from '../hooks/useHandleError';
import useLoader from '../hooks/useLoader';

const CartAndFavs = () => {
	const [cartFullInfo, setCartFullInfo] = useState([]);
	const [favoritesFullInfo, setFavoritesFullInfo] = useState([]);

	const handleError = useHandleError();
	const { startLoading, stopLoading, loaded } = useLoader();

	const { cart: cartIds = [], favorites: favsIds = [] } = useSelector(
		state => state.user
	);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				startLoading();

				const cart = await productService.getMultipleProductsInfo(
					cartIds.map(p => p.product)
				);

				setCartFullInfo(cart);
			} catch (err) {
				return handleError(err, 'fetch products in cart');
			} finally {
				stopLoading();
			}
		};

		fetchProducts();
	}, [cartIds]);

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				startLoading();
				const favorites = await productService.getMultipleProductsInfo(favsIds);

				setFavoritesFullInfo(favorites);
			} catch (err) {
				return handleError(err, 'fetch favorites');
			} finally {
				stopLoading();
			}
		};

		fetchFavorites();
	}, [favsIds]);

	if (!loaded) return null;

	return (
		<div>
			{!!cartFullInfo.length && (
				<ProductList title='My Cart' products={cartFullInfo} />
			)}

			{!!favoritesFullInfo.length && (
				<ProductList title='Favorites' products={favoritesFullInfo} />
			)}
		</div>
	);
};

export default CartAndFavs;
