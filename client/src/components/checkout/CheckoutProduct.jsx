const CheckoutProductCard = ({ product }) => {
	console.log(product);

	return (
		<li className='flex items-center gap-x-10 border border-gray-400 rounded px-6'>
			<div className='flex flex-col items-start pl-8 py-8'>
				<h2 className='text-xl'>{product.name}</h2>
				<p className='text-sm text-gray-600'>{product.price}</p>
			</div>
			<p className='text-3xl ml-auto'>x{product.amount}</p>
		</li>
	);
};

export default CheckoutProductCard;
