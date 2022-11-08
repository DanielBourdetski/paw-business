import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/common/ProductList';
import { getProuctsByTag } from '../services/productService';
import { toast } from 'react-toastify';

const TagProducts = () => {
	const [products, setProducts] = useState([]);
	const { tag = false } = useParams();

	useEffect(() => {
		const getProducts = async () => {
			try {
				const fetchedProducts = await getProuctsByTag(tag);
				setProducts(fetchedProducts);
			} catch (err) {
				return toast.error(err);
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
