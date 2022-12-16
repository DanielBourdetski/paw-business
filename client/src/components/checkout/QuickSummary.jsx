const QuickSummary = ({ total, onNextStage }) => {
	const $ = <span className='text-xs text-green-900 italic font-bold'>$</span>;

	return (
		<div className='text-center md:text-left flex flex-col mx-auto md:min-w-[50%] border border-gray-200 max-h-60 my-10'>
			<div className='bg-primary w-full min-h-[50px] h-12 flex items-center'>
				<h3 className='text-white w-full ml-3 text-xl font-bold text-center md:text-left'>
					Summary
				</h3>
			</div>

			<div className='flex flex-col justify-evenly ml-4 h-full gap-y-4 mt-4'>
				<p>
					Items: {total.toFixed(2)}
					{$}
				</p>

				<p>Shipping: 15{$}</p>

				<p>
					Total: {(total + 15).toFixed(2)}
					{$}
				</p>

				<button
					type='button'
					onClick={onNextStage}
					className='text-yellow-900 whitespace-nowrap bg-yellow-400 hover:bg-yellow-500 focus:outline-none active:bg-yellow-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mx-6 mb-6 dark:focus:ring-yellow-900'>
					Proceed to checkout
				</button>
			</div>
		</div>
	);
};

export default QuickSummary;
