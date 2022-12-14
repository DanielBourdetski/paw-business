import { useEffect } from 'react';
import { useState } from 'react';
import productService from '../../services/productService';
import ProductList from './ProductList';
import useHandleError from '../../hooks/useHandleError';
import useLoader from '../../hooks/useLoader';

const getRandomIndex = limit => Math.floor(Math.random() * (limit - 0.5));
const defaultNumberOfProducts = 4;

const RandomProducts = () => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	const handleError = useHandleError();
	const { startLoading, stopLoading, loaded } = useLoader();

	useEffect(() => {
		const fetchRandomProducts = async () => {
			try {
				startLoading();
				const allProducts = await productService.getAllProducts();

				if (allProducts.length < defaultNumberOfProducts) {
					setProducts(allProducts);
					setLoading(false);
					return;
				}

				let randomProducts = [];

				for (let x = 0; x < defaultNumberOfProducts; x++) {
					let randomIndex = getRandomIndex(allProducts.length);

					while (
						randomProducts.some(p => p._id === allProducts[randomIndex]._id)
					) {
						randomIndex = getRandomIndex(allProducts.length);
					}
					randomProducts.push(allProducts[randomIndex]);
				}
				setProducts(randomProducts);
				setLoading(false);
			} catch (err) {
				handleError(err, 'get popular products');
			} finally {
				stopLoading();
			}
		};

		fetchRandomProducts();
	}, []);

	if (!loaded) return null;

	return (
		<>
			<h2>Recommended</h2>
			<ProductList products={products} />;
		</>
	);
};

export default RandomProducts;
