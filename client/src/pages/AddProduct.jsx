import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/common/ProductForm';
import productService from '../services/productService';
import { validateProduct } from '../validation/products';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useHandleError from '../hooks/useHandleError';

const AddProduct = () => {
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const handleError = useHandleError();

	const onSubmit = async formState => {
		const productData = { ...formState };
		productData.tags = formState.tags?.replaceAll(' ', '').split(',');

		const { error } = validateProduct(productData);
		if (error) {
			const newErrors = {};

			error.details.forEach((err, i) => {
				newErrors[err.path[0]] = err.message;
				setTimeout(() => toast.info(err.message), 80 * i);
			});

			return setErrors(newErrors);
		}

		try {
			await productService.addProduct(productData);
			navigate('/products');
		} catch (err) {
			handleError(err, 'create a new product');
		}
	};

	return (
		<ProductForm onSubmit={onSubmit} title='Add Product' errors={errors} />
	);
};

export default AddProduct;
