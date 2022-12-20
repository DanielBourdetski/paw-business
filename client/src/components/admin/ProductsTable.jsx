import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import useHandleError from '../../hooks/useHandleError';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useLoader from '../../hooks/useLoader';
import Tags from '../common/Tags';

const ProductsTable = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	console.log(filteredProducts);

	const navigate = useNavigate();
	const handleError = useHandleError();
	const { startLoading, stopLoading, loaded } = useLoader();

	useEffect(() => {
		const getData = async () => {
			try {
				startLoading();

				const fetchedProducts = await productService.getAllProducts();
				setProducts(fetchedProducts);
			} catch (err) {
				handleError(err, 'fetch all products');
			} finally {
				stopLoading();
			}
		};

		getData();
	}, []);

	useEffect(() => {
		setFilteredProducts(products);
	}, [products]);

	const onEditProduct = id => {
		navigate(`/edit-product/${id}`);
	};

	const onDeleteProduct = id => {
		const onDelete = async () => {
			try {
				await productService.deleteProduct(id);

				const indexOfProductInProductsState = products.findIndex(
					p => p._id === id
				);
				const updatedProductsState = [...products];
				updatedProductsState.splice(indexOfProductInProductsState, 1);

				setProducts(updatedProductsState);
			} catch (err) {
				handleError(err, 'delete product from database');
			}
		};

		confirmAlert({
			title: 'Are you sure you want to delete the product?',
			message: 'This action is irreversible.',
			buttons: [
				{
					label: 'Delete product',
					onClick: onDelete,
				},
				{
					label: 'Take me back',
				},
			],
		});
	};

	const onSearchProducts = e => {
		e.preventDefault();

		const searchTerm = e.target[0].value;
		if (!searchTerm) return setFilteredProducts(products);

		const regexTerm = new RegExp(searchTerm, 'i');

		const matchingProductsByName = products.filter(p =>
			p.name.match(regexTerm)
		);

		const matchingProductsByAnimal = products.filter(p =>
			p.animal.match(regexTerm)
		);

		const matchingProductsByTags = products.filter(p =>
			p.tags.some(tag => tag.match(regexTerm))
		);

		const matchingProductsByDescription = products.filter(p =>
			p.description.match(regexTerm)
		);

		const matchingProducts = [
			...matchingProductsByName,
			...matchingProductsByAnimal,
			...matchingProductsByTags,
			...matchingProductsByDescription,
		];

		const uniqueMatchingProducts = matchingProducts.filter(
			(p, i, products) => i === products.findIndex(p2 => p2._id === p._id)
		);

		setFilteredProducts(uniqueMatchingProducts);
	};

	if (!loaded) return null;

	return (
		<>
			<form onSubmit={onSearchProducts}>
				<input
					type='text'
					placeholder='Search for products'
					className='border border-black mx-20 my-5 p-1 pl-4 rounded'
				/>
			</form>
			<table className='w-[95%] mx-auto table-auto text-sm text-center border-separate border border-slate-500'>
				<thead>
					<tr>
						<th className='border border-slate-400 '>Product</th>
						<th className='border border-slate-400 '>Description</th>
						<th className='border border-slate-400 '>Price</th>
						<th className='border border-slate-400 '>Image url</th>
						<th className='border border-slate-400 '>Animal</th>
						<th className='border border-slate-400 '>Tags</th>
						<th className='border border-slate-400 '>Amount sold</th>
						<th className='border border-slate-400 '>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredProducts.map(p => {
						return (
							<tr className='h-6' key={p.name}>
								<td className='border border-slate-300'>{p.name}</td>
								<td className='border border-slate-300'>{p.description}</td>
								<td className='border border-slate-300'>{p.price}</td>
								<td className='border border-slate-300 object-contain'>
									<img src={p.image} alt='' />
								</td>
								<td className='border border-slate-300'>{p.animal}</td>
								<td className='border border-slate-300 p-1'>
									{<Tags tags={p.tags} />}
								</td>
								<td className='border border-slate-300'>{p._sold}</td>
								<td className='border border-slate-300'>
									<button onClick={() => onEditProduct(p._id)}>Edit</button>
									<button onClick={() => onDeleteProduct(p._id)}>Delete</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default ProductsTable;
