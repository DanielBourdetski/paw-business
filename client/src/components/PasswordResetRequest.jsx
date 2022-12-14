import { useState } from 'react';
import Input from '../components/common/Input';
import { validateEmail } from '../validation/users';
import { toast } from 'react-toastify';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useHandleError from '../hooks/useHandleError';

const PasswordResetRequest = () => {
	const [email, setEmail] = useState('');

	const navigate = useNavigate();
	const user = useSelector(state => state.user);
	const handleError = useHandleError();

	useEffect(() => {
		if (user.token) navigate('/account');
	}, []);

	const onChange = e => setEmail(e.target.value);

	const onRestLinkSend = async e => {
		e.preventDefault();

		const { error } = validateEmail(email);
		if (error) return toast.error(error.details[0].message);

		try {
			await userService.sendRestLink(email);
			toast.success('A reset link has been sent to your email', {
				autoClose: 2000,
			});
			navigate('/');
		} catch (err) {
			handleError(err, 'request a password reset link');
		}
	};

	return (
		<form onSubmit={onRestLinkSend}>
			<h2>Enter your email address and we will send you a reset link</h2>
			<Input label='Email' value={email} onChange={onChange} />
			<button className='p-1 border rounded' type='submit'>
				Send Reset Link
			</button>
		</form>
	);
};

export default PasswordResetRequest;
