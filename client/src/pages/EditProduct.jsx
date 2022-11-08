import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';
import { validateProduct } from '../validation/products';
import { toast } from 'react-toastify';

const initialProductState = {
	name: '',
	description: '',
	price: '',
	image: '',
	tags: '',
	animal: '',
};

const EditProduct = () => {
	const [productInfo, setProductInfo] = useState(initialProductState);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			// TODO handle no id
			toast.error('No product id!');
			return navigate('/products');
		}

		const fetchProductInfo = async () => {
			try {
				const fetchedInfo = await productService.getProductInfo(id);
				const { name, description, price, image, tags, animal } = fetchedInfo;

				setProductInfo({
					name,
					description,
					price,
					image,
					tags: tags.toString(),
					animal,
				});
			} catch (err) {
				return toast.error(
					err.message ||
						'An unexpected error has occured while fetching product info, please refresh and try again'
				);
			}
		};

		fetchProductInfo();
	}, []);

	const onSubmit = async formState => {
		// validates that all fields are filled
		if (Object.keys(formState).some(k => !formState[k])) {
			return toast.info('All fields are required');
		}

		const productData = { ...formState };
		productData.tags = formState.tags.replaceAll(' ', '').split(',');

		const { error } = validateProduct(productData);

		// TODO handle invalid value
		if (error) return toast.info(error?.details[0]?.message);

		try {
			const res = await productService.updateProduct(productData, id);
			navigate('/admin');
		} catch (err) {
			// TODO handle errors
			return toast.error(
				err.message ||
					'An unexpected error has occured while trying to update the product in the database, please refresh and try again'
			);
		}
	};

	return (
		<ProductForm
			onSubmit={onSubmit}
			defaultState={productInfo}
			title='Edit Product'
		/>
	);
};

export default EditProduct;
