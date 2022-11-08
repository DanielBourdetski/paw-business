import { useLocation, useNavigate } from 'react-router-dom';
import { validateLogin, validateSignup } from '../validation/users';
import userService from '../services/userService';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/store';
import UserForm from '../components/UserForm';
import { toast } from 'react-toastify';

const LoginRegistration = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const type = location.pathname.slice(1);

	const handleLogin = async (e, formState) => {
		e.preventDefault();

		const { email, password } = formState;
		const loginData = { email, password };

		const { error } = validateLogin(loginData);
		if (error) return toast.info(error.details[0].message);

		try {
			const user = await userService.login(loginData);
			userService.saveToken(user.token);

			dispatch(userActions.saveUser(user));

			navigate('/');
		} catch (err) {
			toast.error(
				err.message ||
					'An unexpected error has occured while trying to login, please try again'
			);
		}
	};

	const handleSignup = async (e, formState) => {
		e.preventDefault();

		const { error } = validateSignup(formState);
		if (error) return toast.info(error.details[0].message);

		try {
			const user = await userService.signup(formState);

			userService.saveToken(user.token);
			dispatch(userActions.saveUser(user));

			navigate('/');
		} catch (err) {
			toast.error(
				err.message ||
					'An unexpected error has occured while trying to sign up, please refresh and try again'
			);
		}
	};

	const handleSubmit = type === 'login' ? handleLogin : handleSignup;
	const title = type === 'login' ? 'Login' : 'Signup';

	return (
		<div className='flex flex-col justify-center'>
			<UserForm
				onSubmit={handleSubmit}
				title={title}
				isFullForm={type === 'registration'}
			/>
			;
			<button
				type='button'
				className='text-blue-600 underline'
				onClick={() => navigate(type === 'login' ? '/registration' : '/login')}>
				{type === 'login'
					? 'Not a member yet? Press here to sign up'
					: 'Already a member? Press here to login'}
			</button>
		</div>
	);
};

export default LoginRegistration;
