const Input = ({ label, type = 'text', onChange, value }) => {
	return (
		<label
			className='md:tracking-wide md:w-full md:flex md:items-center md:place-content-between'
			htmlFor={label}>
			{label}
			<input
				type={type}
				onChange={onChange}
				value={value}
				className='border border-gray-500 m-3 rounded-sm'
			/>
		</label>
	);
};

export default Input;
