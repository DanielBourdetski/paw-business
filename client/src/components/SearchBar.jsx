import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<form className='border border-black rounded-full min-w-[200px] max-w-[30%] m-5 p-1 px-2 whitespace-nowrap'>
			<input
				className='bg-transparent focus:outline-0 ml-3'
				type='text'
				value={searchTerm}
				placeholder='Search'
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<button type='submit' onClick={e => onSearch(e, searchTerm)}></button>
		</form>
	);
};

export default SearchBar;
