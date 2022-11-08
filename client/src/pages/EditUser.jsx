import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import adminService from '../services/adminService';
import userService from '../services/userService';
import { userActions } from '../store/store';
import { validatePassword, validateUserUpdate } from '../validation/users';
import { toast } from 'react-toastify';

const EditUser = ({ isAccountUpdate }) => {
	const [userInfo, setUserInfo] = useState(null);
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { name, email } = useSelector(state => state.user);

	console.log(userInfo);

	useEffect(() => {
		console.log('use effect', isAccountUpdate);
		const fetchUserInfo = async () => {
			try {
				const fetchedUser = await adminService.getUserById(id);

				return setUserInfo({
					name: fetchedUser.name,
					email: fetchedUser.email,
					password: '',
				});
			} catch (err) {
				return toast.error(
					err.message ||
						'An unexpected error has occured while trying to fetch user data, please refresh and try again'
				);
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
				return toast.error(
					err.message ||
						'An unexpected error has occured while trying to update user account info, please refresh and try again'
				);
			}
		}

		try {
			const user = await adminService.updateUser(userUpdate, id);
			if (!user) throw new Error('No user with provided id was found');

			return navigate('/admin');
		} catch (err) {
			return toast.error(
				err.message ||
					'An unexpected error has occured while updating user account info, please refresh and try again'
			);
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
