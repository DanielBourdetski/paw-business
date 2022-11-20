import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import adminService from '../services/adminService';
import userService from '../services/userService';
import { userActions } from '../store/store';
import { validatePassword, validateUserUpdate } from '../validation/users';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';

const EditUser = ({ isAccountUpdate }) => {
	const [userInfo, setUserInfo] = useState(null);

	const { name, email } = useSelector(state => state.user);
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleError = useHandleError();

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const fetchedUser = await adminService.getUserById(id);

				return setUserInfo({
					name: fetchedUser.name,
					email: fetchedUser.email,
					password: '',
				});
			} catch (err) {
				handleError(err, 'fetch user info');
			}
		};

		if (!isAccountUpdate) return fetchUserInfo();

		setUserInfo({ name, email, password: '' });
	}, []);

	const handleUserUpdate = async (e, formState) => {
		e.preventDefault();

		const { name, email, password } = formState;
		const userUpdate = { name, email };

		const { error: userError } = validateUserUpdate(userUpdate);
		if (userError) return toast.info(userError.details[0].message);

		if (password) {
			const { error: passwordError } = validatePassword(password);
			if (passwordError) return toast.info(passwordError.details[0].message);

			userUpdate.password = password;
		}

		if (isAccountUpdate) {
			try {
				const user = await userService.updateAccountInfo(userUpdate);
				user.token = userService.getToken();

				dispatch(userActions.saveUser(user));

				return navigate('/account');
			} catch (err) {
				handleError(err, 'update user info');
			}
		}

		try {
			const user = await adminService.updateUser(userUpdate, id);
			if (!user) return toast.error('No user with provided was found');

			return navigate('/admin');
		} catch (err) {
			handleError(err, 'update user info');
		}
	};

	return (
		<UserForm
			defaultValues={userInfo}
			isFullForm
			title={isAccountUpdate ? 'Update account info' : 'Edit user'}
			onSubmit={handleUserUpdate}
		/>
	);
};

export default EditUser;
