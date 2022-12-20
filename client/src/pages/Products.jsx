import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import productService from '../services/productService';
import SearchBar from '../components/common/SearchBar';
import useHandleError from '../hooks/useHandleError';
import useLoader from '../hooks/useLoader';
import { BsFilePlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import NoProductsInStore from '../components/products/NoProductsInStore';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isHovering, setHovering] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const isAdmin = useSelector(state => state.user.isAdmin);

	const handleError = useHandleError();
	const navigate = useNavigate();
	const { startLoading, stopLoading, loaded } = useLoader();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				startLoading();

				const fetchedProducts = await productService.getAllProducts();
				setProducts(fetchedProducts);
			} catch (err) {
				handleError(err, 'get products from database');
			} finally {
				stopLoading();
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

	const handleMouseEnterIcon = () => setHovering(true);

	const handleMouseLeaveIcon = () => setHovering(false);

	const addProductButton = isAdmin ? (
		<div
			onMouseEnter={handleMouseEnterIcon}
			onMouseLeave={handleMouseLeaveIcon}
			onClick={onAddProducts}
			className='fixed z-10 right-10 w-20 h-20 duration-150 bottom-40 md:bottom-10 cursor-pointer hover:-translate-y-2'>
			<BsFilePlus className='h-fit w-20 fill-slate-600 hover:fill-primary duration-150' />
			<p
				className={`opacity-0 ease-out font-bold whitespace-nowrap ${
					isHovering && 'opacity-100 ease-in'
				} text-sm italic duration-300`}>
				Add product
			</p>
		</div>
	) : null;

	if (!loaded) return null;

	if (!products || !products.length) return <NoProductsInStore />;

	return (
		<>
			<SearchBar onSearch={onSearch} />
			<div className='flex flex-col'>
				{addProductButton}
				{content}
			</div>
		</>
	);
};

export default Products;
