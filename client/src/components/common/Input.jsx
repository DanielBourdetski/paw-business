const Input = ({
	label,
	type = 'text',
	onChange,
	value,
	invalidMessage,
	className,
}) => {
	const invalid = !!invalidMessage;
	const invalidClassName = 'border-2 border-red-600';

	return (
		<>
			<label className={`w-full text-lg ${className}`} htmlFor={label}>
				{label}
				<input
					type={type}
					onChange={onChange}
					value={value}
					className={`border border-gray-500 w-full px-3 py-2 focus:outline-none rounded ${
						invalid && invalidClassName
					}`}
				/>
			</label>
			<p
				className={
					invalid
						? 'animate-grow text-sm text-center font-thin mb-5 text-red-400 duration-300'
						: ''
				}>
				{invalidMessage}
			</p>
		</>
	);
};

export default Input;
