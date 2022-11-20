import { useEffect, useState } from 'react';
import productService from '../services/productService';
import Input from './common/Input';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';

const initialFormState = {
	name: '',
	description: '',
	price: '',
	image: '',
	tags: '',
	animal: '',
};

const ProductForm = ({ defaultState, onSubmit, title, errors }) => {
	const [formState, setFormState] = useState(initialFormState);

	const handleError = useHandleError();
	const [allowedAnimals, setAllowedAnimals] = useState([]);

	useEffect(() => {
		const getAllowedAnimals = async () => {
			try {
				const res = await productService.getAllowedAnimals();

				setAllowedAnimals(res.data);
				setFormState({ ...defaultState, animal: res.data[0] });
			} catch (err) {
				handleError(err, 'fetch animals list');
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
				invalidMessage={errors.name}
			/>
			<Input
				value={formState.description}
				label='Description'
				onChange={e => onChange(e, 'description')}
				invalidMessage={errors.description}
			/>
			<Input
				value={formState.price}
				label='Price'
				onChange={e => onChange(e, 'price')}
				invalidMessage={errors.price}
			/>
			<Input
				value={formState.image}
				label='Image URL'
				onChange={e => onChange(e, 'image')}
				invalidMessage={errors.image}
			/>
			<Input
				value={formState.tags}
				label='Tags (seperated by commas)'
				onChange={e => onChange(e, 'tags')}
				invalidMessage={errors.tags}
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
