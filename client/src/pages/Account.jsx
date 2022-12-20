import { useEffect, useState } from 'react';
import CartAndFavs from '../components/CartAndFavs';

import userService from '../services/userService';
import useHandleError from '../hooks/useHandleError';
import { useNavigate } from 'react-router-dom';
import useLoader from '../hooks/useLoader';

const Account = () => {
	const [accountInfo, setAccountInfo] = useState({});

	const handleError = useHandleError();
	const navigate = useNavigate();
	const { startLoading, stopLoading, loaded } = useLoader();

	useEffect(() => {
		const getAccountInfo = async () => {
			try {
				const fetchedInfo = await userService.getAccountInfo();
				setAccountInfo(fetchedInfo);
				startLoading();
			} catch (err) {
				handleError(err);
			} finally {
				stopLoading();
			}
		};
		getAccountInfo();
	}, []);

	if (!loaded) return null;

	// TODO continue this
	return (
		<div className='min-h-[50vh]'>
			<h1 className='text-3xl text-center'>My Account</h1>
			<h2 className='text-xl text-center'>Hello, {accountInfo.name}</h2>
			<div className='flex gap-x-1 mt-2'>
				<p>Linked Email: {accountInfo.email}</p>
				<button
					className='text-gray-500 border rounded px-1 hover:text-gray-600 hover:bg-gray-200 duration-150'
					onClick={() => navigate('/update-account')}>
					update
				</button>
			</div>
			<p>
				Member since{' '}
				{new Date(accountInfo.createdAt).toLocaleDateString('en-GB')}
			</p>

			<hr className='my-6' />

			<CartAndFavs />
		</div>
	);
};

export default Account;
