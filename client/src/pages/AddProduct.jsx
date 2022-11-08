import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';
import { validateProduct } from '../validation/products';
import { toast } from 'react-toastify';

const AddProduct = () => {
	const navigate = useNavigate();

	const onSubmit = async formState => {
		// validate that all fields are filled
		if (Object.keys(formState).some(k => !formState[k])) {
			// TODO handle empty values
			return console.log('All fields are required');
		}

		const productData = { ...formState };
		productData.tags = formState.tags.replaceAll(' ', '').split(',');

		const { error } = validateProduct(productData);
		if (error) return toast.info(error?.details[0]?.message);

		try {
			const res = await productService.addProduct(productData);
			console.log(res);
			navigate('/products');
		} catch (err) {
			toast.error(
				err.message ||
					'An unexpected error has occured while trying to add the product'
			);
		}
	};

	return <ProductForm onSubmit={onSubmit} title='Add Product' />;
};

export default AddProduct;
