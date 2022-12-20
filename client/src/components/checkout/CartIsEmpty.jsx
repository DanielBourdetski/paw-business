const CartIsEmpty = () => {
	const emptyCartImage = (
		<img className='w-80 mx-auto' src='/images/empty-cart.png' />
	);

	return (
		<div className='w-full'>
			{emptyCartImage}
			<h2 className='text-center text-4xl'>
				Whoops, seems like your cart is empty
			</h2>
		</div>
	);
};

export default CartIsEmpty;
