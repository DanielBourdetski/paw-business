import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useHandleError from '../../hooks/useHandleError';
import userService from '../../services/userService';

const FinalSummary = ({ cart, paymentInfo }) => {
	const navigate = useNavigate();
	const handleError = useHandleError();

	const onPurchase = async () => {
		try {
			await userService.payForCart(paymentInfo);

			toast.success('Thank you for your purchase!');
			navigate('/');
		} catch (err) {
			handleError(err, 'complete purchase');
		}
	};

	return (
		<div className='w-2/3 mx-auto flex flex-col'>
			<h2 className='text-xl italic font-semibold p-4 text-center'>Summary</h2>
			<div className='flex flex-col md:flex-row gap-x-4 justify-between'>
				<ul className='md:w-1/2'>
					{cart?.map(i => (
						<li
							key={i.name}
							className='flex items-center justify-between w-full mb-4 border rounded p-2'>
							<div className='flex flex-col items-start'>
								<h3>{i.name}</h3>
								<p className='text-gray-500 font-semibold'>{i.price}</p>
							</div>

							<p className='text-xl'>
								x{i.amount} = {i.price * i.amount}
								<span className='italic ml-1'>$</span>
							</p>
						</li>
					))}
				</ul>

				<div className='flex flex-col justify-evenly items-start p-3 h-min gap-y-4 px-8 border rounded bg-slate-200 shadow-inner'>
					<p>Name: {paymentInfo.name}</p>
					<p className='flex flex-col md:flex-row gap-x-1'>
						Credit Card:
						<span> **** **** **** {paymentInfo.cardNumber.slice(14)}</span>
					</p>
				</div>
			</div>
			<button
				onClick={onPurchase}
				className='text-green-900 bg-green-400 hover:bg-green-500 focus:outline-none active:bg-green-600 font-medium rounded-full text-sm px-5 py-2.5 mt-10 text-center dark:focus:ring-green-900 self-center mb-10'>
				Complete Purchase
			</button>
		</div>
	);
};

export default FinalSummary;
