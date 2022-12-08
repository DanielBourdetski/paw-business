import { useState } from 'react';
import CardInfo from './CardInfo.jsx';
import { validateFullName } from '../../validation/misc.js';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const PersonalInfo = ({ paymentState, onPreviousStage, onNextStage }) => {
	const { paymentInfo, setPaymentInfo } = paymentState;

	console.log(paymentInfo);

	const [error, setError] = useState(null);
	const [meta, setMeta] = useState(null);

	const values = Object.values(paymentInfo);
	const isFormComplete = !values.some(v => v === '');

	useEffect(() => {
		if (!error) return;
		toast.info(error);
	}, [error]);

	const onNameChange = e => {
		setPaymentInfo({ ...paymentInfo, name: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		setError(false);

		if (meta.error) return setError(meta.error);

		const { error } = validateFullName(paymentInfo.name);
		if (error) setError(error.details[0].message);

		onNextStage();
	};

	return (
		<form
			onSubmit={onSubmit}
			className='w-1/4 mx-auto flex flex-col gap-y-4 border rounded p-10 shadow bg-slate-100 min-w-[400px]'>
			<div>
				<label className='mr-2 font-semibold mt-4 mb-2 ml-2'>Card Owner</label>
				<input
					type='text'
					className='border border-[#BFBFBF] bg-slate-100 shadow-inner rounded w-full p-2 mx-auto pl-4 focus:outline-2 focus:outline-primary'
					placeholder='Full name'
					value={paymentInfo.name}
					onChange={onNameChange}
				/>
			</div>

			{/* CardInfo is in a different component because card validation comes from a third party library */}
			<CardInfo
				cardState={{ paymentInfo, setPaymentInfo }}
				onMetaChange={m => setMeta(m)}
			/>

			{error && <p className='text-red-400 text-center'>{error}</p>}

			<button
				type='submit'
				disabled={!isFormComplete}
				className='text-green-900 bg-green-400 hover:bg-green-500 focus:outline-none active:bg-green-600 mt-10 w-1/2 font-medium rounded-full text-sm px-5 py-2.5 text-center mx-auto dark:focus:ring-yellow-900 disabled:opacity-50 disabled:hover:bg-green-400'>
				Continue
			</button>
		</form>
	);
};

export default PersonalInfo;
