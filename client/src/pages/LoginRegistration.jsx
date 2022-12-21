import { useLocation, useNavigate } from 'react-router-dom';
import { validateLogin, validateSignup } from '../validation/users';
import userService from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/store';
import UserForm from '../components/common/UserForm';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import useHandleError from '../hooks/useHandleError';
import { Name } from '../components/common/Logos';

const LoginRegistration = () => {
	const [errors, setErrors] = useState({});

	const user = useSelector(state => state.user);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleError = useHandleError();

	const type = location.pathname.slice(1);

	useEffect(() => {
		setErrors({});
	}, [type]);

	useEffect(() => {
		if (user.token) navigate('/');
	}, []);

	const onForgotPassword = () => navigate('/forgot-password');

	const handleLogin = async (e, formState) => {
		e.preventDefault();
		setErrors({});

		const { email, password } = formState;
		const loginData = { email, password };

		const { error } = validateLogin(loginData);
		if (error) {
			const currentErrors = {};

			error.details.forEach((err, i) => {
				currentErrors[err.context.label] = err.message;
				setTimeout(() => toast.info(err.message), (i + 1) * 80);
			});

			return setErrors(currentErrors);
		}

		try {
			const user = await userService.login(loginData);
			userService.saveToken(user.token);

			dispatch(userActions.saveUser(user));

			navigate('/');
		} catch (err) {
			handleError(err, 'login');
		}
	};

	const handleSignup = async (e, formState) => {
		e.preventDefault();

		const { error } = validateSignup(formState);
		if (error) {
			const currentErrors = {};

			error.details.forEach((err, i) => {
				currentErrors[err.context.label] = err.message;
				setTimeout(() => toast.info(err.message), (i + 1) * 80);
			});

			return setErrors(currentErrors);
		}

		try {
			const user = await userService.signup(formState);

			setErrors({});

			console.log(user);

			userService.saveToken(user.token);
			dispatch(userActions.saveUser(user));

			navigate('/');
		} catch (err) {
			if (err?.response?.status === 403) {
				toast.error(err.response.data);
				return setErrors({
					email: 'User with this email address already exists',
				});
			}

			handleError(err, 'signup');
		}
	};

	const handleSubmit = type === 'login' ? handleLogin : handleSignup;
	const title = type === 'login' ? 'Login' : 'Signup';

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='w-4/5 mt-10'>
				<Name className='mx-auto' />
			</div>
			<UserForm
				onSubmit={handleSubmit}
				title={title}
				isFullForm={type === 'registration'}
				errors={errors}
			/>

			<button
				type='button'
				className='text-blue-600 underline'
				onClick={() => navigate(type === 'login' ? '/registration' : '/login')}>
				{type === 'login'
					? 'Not a member yet? Press here to sign up'
					: 'Already a member? Press here to login'}
			</button>

			<button
				className='p-1 text-slate-500 hover:text-slate-700 text-sm'
				onClick={onForgotPassword}>
				Forgot Password
			</button>
		</div>
	);
};

export default LoginRegistration;
