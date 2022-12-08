import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import useHandleError from '../hooks/useHandleError';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProductsTable = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const navigate = useNavigate();
	const handleError = useHandleError();

	useEffect(() => {
		const getData = async () => {
			try {
				const fetchedProducts = await productService.getAllProducts();
				setProducts(fetchedProducts);
			} catch (err) {
				handleError(err, 'fetch all products');
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

		const matchingProductsByName = products.filter(p =>
			p.name.match(new RegExp(searchTerm, 'i'))
		);

		const matchingProductsByAnimal = products.filter(p =>
			p.animal.match(new RegExp(searchTerm, 'i'))
		);

		const matchingProductsByTags = products.filter(p => {
			p.tags.includes(new RegExp(searchTerm, 'i'));
		});

		const matchingProducts = [
			...matchingProductsByName,
			...matchingProductsByAnimal,
			...matchingProductsByTags,
		];

		const uniqueMatchingProducts = matchingProducts.filter(
			(p, i, products) => i === products.findIndex(p2 => p2._id === p._id)
		);

		setFilteredProducts(uniqueMatchingProducts);
	};

	return (
		<>
			<form onSubmit={onSearchProducts}>
				<input
					type='text'
					placeholder='Search for products'
					className='border border-black mx-20 my-5 p-1 pl-4 rounded'
				/>
			</form>
			<table className='w-[95%] mx-auto table-auto text-sm text-center'>
				<thead>
					<tr>
						<th>Product</th>
						<th>Description</th>
						<th>Price</th>
						<th>Image</th>
						<th>Animal</th>
						<th>Tags</th>
						<th>Amount sold</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredProducts.map(p => {
						return (
							<tr className='h-6' key={p.name}>
								<td>{p.name}</td>
								<td>{p.description}</td>
								<td>{p.price}</td>
								<td>{p.image}</td>
								<td>{p.animal}</td>
								<td>{p.tags}</td>
								<td>{p._sold}</td>
								<td>
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
