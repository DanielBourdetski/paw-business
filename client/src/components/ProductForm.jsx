import { useEffect, useState } from 'react';
import productService from '../services/productService';
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

const ProductForm = ({ defaultState, onSubmit, title }) => {
	const [formState, setFormState] = useState(initialFormState);
	const [allowedAnimals, setAllowedAnimals] = useState([]);

	useEffect(() => {
		const getAllowedAnimals = async () => {
			try {
				const res = await productService.getAllowedAnimals();

				setAllowedAnimals(res.data);
				setFormState({ ...defaultState, animal: res.data[0] });
			} catch (err) {
				toast.error(
					err.message ||
						'An unexpected error has occured while getting the list of the allowed animals'
				);
			}
		};

		getAllowedAnimals();
	}, [defaultState]);

	const handleSubmit = e => {
		e.preventDefault();
		onSubmit(formState);
	};

	const onChange = (e, field) => {
		setFormState({ ...formState, [field]: e.target.value });
	};

	return (
		<form className='w-1/2 mx-auto'>
			<h2 className='text-center text-2xl m-6'>{title}</h2>
			<Input
				value={formState.name}
				label='Product name'
				onChange={e => onChange(e, 'name')}
			/>
			<Input
				value={formState.description}
				label='Description'
				onChange={e => onChange(e, 'description')}
			/>
			<Input
				value={formState.price}
				label='Price'
				onChange={e => onChange(e, 'price')}
			/>
			<Input
				value={formState.image}
				label='Image URL'
				onChange={e => onChange(e, 'image')}
			/>
			<Input
				value={formState.tags}
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
				onClick={handleSubmit}>
				{title}
			</button>
		</form>
	);
};

export default ProductForm;
