const TagCard = ({ tag }) => {
	return (
		<li className='border w-min h-min rounded px-1 text-center text-sm'>
			{tag}
		</li>
	);
};

const Tags = ({ tags }) => {
	return (
		<ul className='flex flex-wrap gap-y-1 gap-x-1'>
			{tags.map(t => (
				<TagCard key={t} tag={t} />
			))}
		</ul>
	);
};

export default Tags;
