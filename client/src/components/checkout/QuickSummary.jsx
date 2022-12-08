const QuickSummary = ({ total, onNextStage }) => {
	const $ = <span className='text-xs text-green-900 italic font-bold'>$</span>;

	return (
		<div className='flex flex-col min-w-[30%] border border-gray-200 max-h-60'>
			<div className='bg-primary w-full h-12 flex items-center'>
				<h3 className='text-white ml-3 text-xl font-bold'>Summary</h3>
			</div>

			<div className='flex flex-col justify-evenly ml-4 h-full'>
				<p>
					Items: {total}
					{$}
				</p>

				<p>Shipping: 15{$}</p>

				<p>
					Total: {total + 15}
					{$}
				</p>

				<button
					type='button'
					onClick={onNextStage}
					className='text-yellow-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none active:bg-yellow-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900'>
					Proceed to checkout
				</button>
			</div>
		</div>
	);
};

export default QuickSummary;
