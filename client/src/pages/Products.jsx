import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductList from '../components/common/ProductList';
import productService from '../services/productService';
import { toast } from 'react-toastify';
import SearchBar from '../components/SearchBar';

const Products = () => {
	const [products, setProducts] = useState({});
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const { search: keywords } = useParams();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const fetchedProducts = keywords
					? await productService.searchByKeywords(keywords)
					: await productService.getPopularProducts();

				setProducts(fetchedProducts);
			} catch (err) {
				toast.error(
					err.message ||
						'An unexpected error has occured while trying to fetch products'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [keywords]);

	if (loading) return <p>LOADING</p>;

	const productsLists = [];
	if (!keywords) {
		for (let tag in products) {
			productsLists.push(
				<ProductList key={tag} title={tag} products={products[tag]} />
			);
		}
	}

	const content = keywords ? (
		<ProductList title={`Search results for ${keywords}`} products={products} />
	) : (
		productsLists
	);

	const onAddProducts = () => navigate('/add-product');

	return (
		<>
			<SearchBar />
			<div className='flex flex-col'>
				<div className='absolute rounded-full h-20 w-20 border-2 border-black right-10 bottom-10 flex place-content-center'>
					<button className='text-5xl font-thin' onClick={onAddProducts}>
						+
					</button>
				</div>
				{content}
			</div>
		</>
	);
};

export default Products;
