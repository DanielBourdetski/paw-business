import { useEffect } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';

const CardInfo = ({ cardState, onMetaChange }) => {
	const { paymentInfo, setPaymentInfo } = cardState;
	const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
		usePaymentInputs();

	useEffect(() => {
		onMetaChange(meta);
	}, [meta.isTouched, meta.error]);

	const handleChange = (e, field) => {
		const updatedInfo = {
			...paymentInfo,
			[field]: e.target.value,
		};

		setPaymentInfo(updatedInfo);
	};

	return (
		<div className='flex flex-col gap-y-4'>
			<div className='w-full'>
				<label className='mr-2 font-semibold mt-4 mb-2 ml-2'>Card Number</label>
				<input
					className='border border-[#BFBFBF] bg-slate-100 shadow-inner rounded w-full p-2 mx-auto pl-4 focus:outline-2 focus:outline-primary'
					{...getCardNumberProps({
						onChange: e => handleChange(e, 'cardNumber'),
					})}
					value={paymentInfo.cardNumber}
				/>
			</div>

			<div className='w-full'>
				<label className='mr-2 font-semibold mt-4 mb-2 ml-2'>
					Expiration Date
				</label>
				<input
					className='border border-[#BFBFBF] bg-slate-100 shadow-inner rounded w-full p-2 mx-auto pl-4 focus:outline-2 focus:outline-primary'
					{...getExpiryDateProps({
						onChange: e => handleChange(e, 'expiryDate'),
					})}
					value={paymentInfo.expiryDate}
				/>
			</div>

			<div className='w-full'>
				<label className='mr-2 font-semibold mt-4 mb-2 ml-2'>CVC</label>
				<input
					className='border border-[#BFBFBF] bg-slate-100 shadow-inner rounded w-full p-2 mx-auto pl-4 focus:outline-2 focus:outline-primary'
					{...getCVCProps({
						onChange: e => handleChange(e, 'cvc'),
					})}
					value={paymentInfo.cvc}
				/>
			</div>
		</div>
	);
};

export default CardInfo;
