import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { validateProduct } from '../validation/products';
import Input from './common/Input';
import { toast } from 'react-toastify';

const initialFormState = {
	name: '',
	description: '',
	price: '',
	image: '',
	tags: '',
	animal: '',
};

const AddProductForm = () => {
	const [formData, setFormState] = useState(initialFormState);
	const [allowedAnimals, setAllowedAnimals] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const getAllowedAnimals = async () => {
			try {
				const res = await productService.getAllowedAnimals();
				setAllowedAnimals(res.data);
				setFormState({ ...formData, animal: res.data[0] });
			} catch (err) {
				console.log(err);
			}
		};

		getAllowedAnimals();
	}, []);

	const onSubmit = async e => {
		e.preventDefault();

		// validate that all fields are filled
		if (Object.keys(formData).some(k => !formData[k])) {
			// TODO handle empty values
			return toast.info('All values are required');
		}

		const productData = { ...formData };
		productData.tags = formData.tags.replaceAll(' ', '').split(',');

		const { error } = validateProduct(productData);

		// TODO handle invalid value
		if (error || !allowedAnimals.includes(productData.animal))
			return toast.info(`Invalid field: ${error.details[0].message}`);

		try {
			const res = await productService.addProduct(productData);
			console.log(res);
			navigate('/products');
		} catch (err) {
			// TODO handle errors
			console.log(err);
		}
	};

	const onChange = (e, field) => {
		const value = e.target.value;
		setFormState({ ...formData, [field]: value });
	};

	return (
		<form className='w-1/2 mx-auto'>
			<Input
				value={formData.name}
				label='Product name'
				onChange={e => onChange(e, 'name')}
			/>
			<Input
				value={formData.description}
				label='Description'
				onChange={e => onChange(e, 'description')}
			/>
			<Input
				value={formData.price}
				label='Price'
				onChange={e => onChange(e, 'price')}
			/>
			<Input
				value={formData.image}
				label='Image URL'
				onChange={e => onChange(e, 'image')}
			/>
			<Input
				value={formData.tags}
				label='Tags (seperated by commas)'
				onChange={e => onChange(e, 'tags')}
			/>

			<select
				className='p-1 ml-auto rounded border border-gray-600'
				name='animal'
				id='animal'
				defaultValue={allowedAnimals[0]}
				onChange={e => onChange(e, 'animal')}>
				{allowedAnimals.map(a => (
					<option key={a} value={a}>
						{a}
					</option>
				))}
			</select>

			<button
				className='p-1 border border-gray-600 rounded mx-auto'
				onClick={onSubmit}>
				Add Product
			</button>
		</form>
	);
};

export default AddProductForm;
