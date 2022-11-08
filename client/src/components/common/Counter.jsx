const Counter = ({ title, countee, array }) => {
	return (
		<div className='w-1/4 h-12 flex items-center p-6 m-5 rounded-3xl border border-slate-400 justify-center'>
			<h2 className='text-xl font-bold mr-2'>{title}</h2>
			<p>
				{array.length} {countee}(s)
			</p>
		</div>
	);
};

export default Counter;
