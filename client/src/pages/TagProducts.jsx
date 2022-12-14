import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { getProuctsByTag } from '../services/productService';
import useHandleError from '../hooks/useHandleError';
import useLoader from '../hooks/useLoader';

const TagProducts = () => {
	const [products, setProducts] = useState([]);

	const { tag = false } = useParams();

	const handleError = useHandleError();
	const { startLoading, stopLoading, loaded } = useLoader();

	useEffect(() => {
		const getProducts = async () => {
			try {
				startLoading();
				const fetchedProducts = await getProuctsByTag(tag);
				setProducts(fetchedProducts);
			} catch (err) {
				return handleError(err, 'fetch products');
			} finally {
				stopLoading();
			}
		};

		getProducts();
	}, [tag]);

	if (!loaded) return null;

	return (
		<div className='flex flex-col'>{<ProductList products={products} />}</div>
	);
};

export default TagProducts;
