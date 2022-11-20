import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/common/ProductList';
import { getProuctsByTag } from '../services/productService';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';

const TagProducts = () => {
	const [products, setProducts] = useState([]);

	const { tag = false } = useParams();
	const handleError = useHandleError();

	useEffect(() => {
		const getProducts = async () => {
			try {
				const fetchedProducts = await getProuctsByTag(tag);
				setProducts(fetchedProducts);
			} catch (err) {
				return handleError(err, 'fetch products');
			}
		};

		getProducts();
	}, [tag]);

	if (!tag) return <p>LOADING</p>;

	return (
		<div className='flex flex-col'>{<ProductList products={products} />}</div>
	);
};

export default TagProducts;
