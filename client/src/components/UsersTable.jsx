import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';

const UsersTable = () => {
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();
	const handleError = useHandleError();

	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const fetchedUsers = await userService.getAllUsers();
				setUsers(fetchedUsers);
			} catch (err) {
				handleError(err, 'fetch all users infos');
			}
		};

		fetchAllUsers();
	}, []);

	const toggleAdminStatus = async id => {
		try {
			const user = await adminService.toggleAdminStatusOfUser(id);
			if (!user) return;

			const indexOfUserInState = users.findIndex(u => u._id === id);
			const updatedUserState = [...users];
			updatedUserState[indexOfUserInState] = user;

			setUsers(updatedUserState);
		} catch (err) {
			handleError(err, 'toggle admin status of a user');
		}
	};

	const onDeleteUser = async id => {
		try {
			const deletedUser = await adminService.deleteUser(id);

			const userIndexInState = users.findIndex(u => u._id === deletedUser._id);
			const updatedUsers = [...users];
			updatedUsers.splice(userIndexInState, 1);

			setUsers(updatedUsers);
		} catch (err) {
			handleError(err, 'delete a user from database');
		}
	};

	const editUser = id => navigate(`/edit-user/${id}`);

	// TODO make user search functionality

	return (
		<table className='w-[95%] mx-auto table-auto text-sm text-center'>
			<thead>
				<tr>
					<th>User</th>
					<th>Email</th>
					<th>Is admin?</th>
					<th>Cart</th>
					<th>Favorites</th>
					<th>User since</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{users.map(u => {
					return (
						<tr key={u.email}>
							<td>{u.name}</td>
							<td>{u.email}</td>
							<td>{u.isAdmin ? 'Yes' : 'No'}</td>
							<td>{u.cart.length}</td>
							<td>{u.favorites.length}</td>
							<td>
								{new Date(u.createdAt)
									.toLocaleDateString('en-GB', {
										day: 'numeric',
										month: '2-digit',
										year: 'numeric',
									})
									.replaceAll('/', '-')}
							</td>
							<td>
								<button className='mx-1' onClick={() => editUser(u._id)}>
									Edit
								</button>
								<button className='mx-1' onClick={() => onDeleteUser(u._id)}>
									{' '}
									X{' '}
								</button>
								<button
									className='mx-1'
									onClick={() => toggleAdminStatus(u._id)}>
									{u.isAdmin ? 'Revoke admin status' : 'Make admin'}
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default UsersTable;
