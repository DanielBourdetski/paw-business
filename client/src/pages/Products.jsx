import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductList from '../components/common/ProductList';
import productService from '../services/productService';
import SearchBar from '../components/SearchBar';
import useHandleError from '../hooks/useHandleError';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);

	const handleError = useHandleError();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const fetchedProducts = await productService.getAllProducts();
				setProducts(fetchedProducts);
			} catch (err) {
				handleError(err, 'get products from database');
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const productsLists = [];

	const catProducts = products.filter(p => p.animal === 'Cat');
	const dogProducts = products.filter(p => p.animal === 'Dog');

	productsLists.push(
		<ProductList
			key={'cat'}
			title={'Cats'}
			products={catProducts.slice(0, 4)}
		/>,
		<ProductList
			key={'dog'}
			title={'Dogs'}
			products={dogProducts.slice(0, 4)}
		/>
	);

	const content = searchTerm.length ? (
		<ProductList
			title={`Search results for ${searchTerm}`}
			products={filteredProducts}
		/>
	) : (
		productsLists
	);

	const onSearch = (e, search) => {
		e.preventDefault();

		setSearchTerm(search);
		if (search === '') return setFilteredProducts([]);

		const keywords = search.trim().split(' ');
		keywords.forEach(kw => (kw = kw.toLowerCase()));

		const matchingProducts = products.filter(p => {
			return keywords.some(
				v =>
					p.name.toLowerCase().includes(v) ||
					p.description.toLowerCase().includes(v) ||
					p.tags.some(t => t.toLowerCase() === v) ||
					p.animal.toLowerCase() === v
			);
		});

		setFilteredProducts(matchingProducts);
	};

	const onAddProducts = () => navigate('/add-product');

	if (loading) return <p>LOADING</p>;

	return (
		<>
			<SearchBar onSearch={onSearch} />
			<div className='flex flex-col'>
				<div className='fixed rounded-full h-20 w-20 border-2 border-black right-10 bottom-10 flex place-content-center'>
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
