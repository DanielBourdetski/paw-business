const CheckoutStageIndicator = ({ stage = 1, previousStage }) => {
	const currentStageClass = 'bg-primary text-white';

	return (
		<div className='flex w-1/2 md:w-1/4 mt-4 mx-auto items-center justify-items-stretch'>
			<button
				disabled={stage === 1}
				onClick={previousStage}
				className='h-8 w-8 ml-auto flex border rounded-full items-center self-center mr-2 justify-center font-mono border-slate-300 bg-white justify-self-start hover:bg-slate-200 disabled:opacity-30 hover:disabled:bg-white'>
				{'<'}
			</button>
			<div className='flex mx-auto my-4 w-full justify-between justify-self-center relative'>
				<div className='absolute -z-10 border-b-2 border-black w-full top-1/2' />
				<div
					className={`rounded-full border-2 border-black w-10 h-10 flex items-center justify-center ${
						stage === 1 ? currentStageClass : 'bg-white'
					}`}>
					1
				</div>
				<div
					className={`rounded-full border-2 border-black w-10 h-10 flex items-center justify-center ${
						stage === 2 ? currentStageClass : 'bg-white'
					}`}>
					2
				</div>
				<div
					className={`rounded-full border-2 border-black w-10 h-10 flex items-center justify-center ${
						stage === 3 ? currentStageClass : 'bg-white'
					}`}>
					3
				</div>
			</div>
		</div>
	);
};

export default CheckoutStageIndicator;
