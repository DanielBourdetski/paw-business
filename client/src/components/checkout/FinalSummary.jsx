import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';

const FinalSummary = ({ cart, paymentInfo }) => {
	const navigate = useNavigate('/');

	const onPurchase = () => {
		userService.purchase();
	};

	return (
		<div className='w-2/3 mx-auto flex flex-col'>
			<h2 className='text-xl italic font-semibold p-4 text-center'>Summary</h2>
			<div className='flex justify-between'>
				<ul className='w-1/2'>
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

				<div className='flex flex-col justify-evenly items-start p-3 h-min gap-y-4 px-8 border rounded'>
					<p>Name: {paymentInfo.name}</p>
					<p>Credit Card: **** **** **** {paymentInfo.cardNumber.slice(14)}</p>
				</div>
			</div>
			<button
				onClick={onPurchase}
				className='text-green-900 bg-green-400 hover:bg-green-500 focus:outline-none active:bg-green-600 font-medium rounded-full text-sm px-5 py-2.5 mt-10 text-center dark:focus:ring-green-900 self-center'>
				Complete Purchase
			</button>
		</div>
	);
};

export default FinalSummary;
