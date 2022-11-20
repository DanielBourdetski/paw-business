import { useEffect } from 'react';
import { useState } from 'react';
import productService from '../services/productService';
import ProductList from './common/ProductList';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';

const getRandomIndex = limit => Math.floor(Math.random() * (limit - 0.5));

const RandomProducts = () => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	const handleError = useHandleError();

	useEffect(() => {
		const fetchRandomProducts = async () => {
			try {
				const allProducts = await productService.getAllProducts();

				if (allProducts.length < 3) {
					setProducts(allProducts);
					setLoading(false);
					return;
				}

				let randomProducts = [];

				for (let x = 0; x < 3; x++) {
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
			}
		};

		fetchRandomProducts();
	}, []);

	if (loading) return <p>LOADING...</p>;

	return (
		<>
			<h2>Recommended</h2>
			<ProductList products={products} />;
		</>
	);
};

export default RandomProducts;
