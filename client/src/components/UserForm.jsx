import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import { useSelector } from 'react-redux';

const defaultFormState = {
	email: '',
	password: '',
	name: '',
};

const UserForm = ({ onSubmit, defaultValues, title, isFullForm }) => {
	const [formState, setFormState] = useState({ ...defaultFormState });

	const navigate = useNavigate();
	const location = useLocation();
	const user = useSelector(state => state.user);

	useEffect(() => {
		if (
			user.token &&
			(location.pathname === '/login' || location.pathname === '/registraion')
		) {
			return navigate('/');
		}

		if (defaultValues) return setFormState({ ...defaultValues });
	}, [defaultValues]);

	return (
		<form
			onSubmit={e => onSubmit(e, formState)}
			className='flex flex-col w-2/3 mx-auto mt-10 items-center'>
			<h1 className='text-2xl '>
				{defaultValues ? `Edit ${defaultValues.name}'s account info` : title}
			</h1>

			<div className='flex flex-col'>
				{isFullForm && (
					<Input
						value={formState.name}
						label='Name'
						onChange={e => setFormState({ ...formState, name: e.target.value })}
					/>
				)}

				<Input
					value={formState.email}
					label='Email'
					onChange={e => setFormState({ ...formState, email: e.target.value })}
				/>

				<Input
					value={formState.password}
					label='Password'
					onChange={e =>
						setFormState({ ...formState, password: e.target.value })
					}
					type='password'
				/>
			</div>

			<button
				className='m-2 border py-1 px-3 rounded hover:bg-slate-200 duration-300'
				type='submit'>
				{title}
			</button>
		</form>
	);
};

export default UserForm;
