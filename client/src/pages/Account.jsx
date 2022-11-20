import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartAndFavs from '../components/CartAndFavs';

import productService from '../services/productService';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';

const Account = () => {
	const [loading, setLoading] = useState(2);
	const [accountInfo, setAccountInfo] = useState({});

	const handleError = useHandleError();

	useEffect(() => {
		const getAccountInfo = async () => {
			try {
				const fetchedInfo = await userService.getAccountInfo();
				setAccountInfo(fetchedInfo);
				setLoading(updatedLoading => updatedLoading - 1);
			} catch (err) {
				handleError(err);
			} finally {
				setLoading(false);
			}
		};
		getAccountInfo();
	}, []);

	if (loading) return <p>LOADING...</p>;

	// TODO continue this
	return (
		<div>
			<h1 className='text-3xl'>My Account</h1>
			<h2 className='text-xl'>Hello, {accountInfo.name}</h2>
			<div className='flex gap-x-1'>
				<p>Linked Email: {accountInfo.email}</p>
				<button className='text-gray-500 border rounded px-1 hover:text-gray-600 hover:bg-gray-200 duration-150'>
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
