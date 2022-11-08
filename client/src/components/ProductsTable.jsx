import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { toast } from 'react-toastify';

const ProductsTable = () => {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	console.log(products);

	useEffect(() => {
		const getData = async () => {
			try {
				const fetchedUsers = await productService.getAllProducts();
				setProducts(fetchedUsers);
			} catch (err) {
				toast.error(
					err.message ||
						'An unexpected error has occured while trying to fetch all products'
				);
			}
		};

		getData();
	}, []);

	const onEditProduct = id => {
		navigate(`/edit-product/${id}`);
	};

	const onDeleteProduct = async id => {
		try {
			const deletedProduct = await productService.deleteProduct(id);
			console.log(deletedProduct);

			const indexOfProductInProductsState = products.findIndex(
				p => p._id === id
			);
			const updatedProductsState = [...products];
			updatedProductsState.splice(indexOfProductInProductsState, 1);

			setProducts(updatedProductsState);
		} catch (err) {
			toast.error(
				err.message ||
					'An unexpected error has occured while trying to delete the product from the database'
			);
		}
	};

	// TODO make product search functionality

	return (
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
				{products.map(p => {
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
	);
};

export default ProductsTable;