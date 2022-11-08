import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const [searchWords, setSearchWords] = useState('');
	const navigate = useNavigate();

	console.log('something');

	const onSearch = e => {
		e.preventDefault();
		navigate('/products/' + searchWords);
	};

	return (
		<form className='border border-black rounded-full w-1/5 m-5 p-1 px-2'>
			<input
				className='bg-transparent focus:outline-0 ml-3'
				type='text'
				value={searchWords}
				placeholder='Search'
				onChange={e => setSearchWords(e.target.value)}
			/>
			<button type='submit' onClick={e => onSearch(e)}></button>
		</form>
	);
};

export default SearchBar;
