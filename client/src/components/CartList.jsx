import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productService from '../services/productService';
import { toast } from 'react-toastify';
import userService from '../services/userService';
import { userActions } from '../store/store';

const CartProductCard = ({
	info: { name, description, image, price, animal, tags, amount, _id },
	index,
	cart,
}) => {
	const dispatch = useDispatch();

	const handleAmountChange = async e => {
		const isAdding = e.target.textContent === '+';

		let product;

		if (isAdding) {
			product = await userService.addOrReduceInCart('add', _id);
		}

		if (!isAdding) {
			product = await userService.addOrReduceInCart('reduce', _id);
		}

		const updatedProducts = [...cart];
		updatedProducts[index] = product;

		dispatch(userActions.updateCart(updatedProducts));
	};

	const onProductRemove = async () => {
		try {
			const deletedProduct = await userService.removeFromCart(_id);
			console.log(deletedProduct);

			const updatedCart = [...cart];
			updatedCart.splice(index, 1);
			dispatch(userActions.updateCart(updatedCart));
		} catch (err) {
			toast.error(
				err.message ||
					'An error has occured while trying to remove the selected product from the cart'
			);
		}
	};

	return (
		<div className='border border-black p-1 m-3'>
			<h2 className='text-lg font-bold'>{name}</h2>
			<p>{description}</p>
			<ul>
				{tags.map(t => (
					<li key={t}>{t}</li>
				))}
			</ul>
			<p>{price}</p>
			<p>{image}</p>
			<p>For: {animal}</p>
			<p>Amount: {amount}</p>
			<div>
				<button onClick={handleAmountChange} className='p-1 border rounded m-2'>
					-
				</button>
				<button onClick={handleAmountChange} className='p-1 border rounded m-2'>
					+
				</button>
				<button className='p-1 border rounded m-2' onClick={onProductRemove}>
					Remove Item
				</button>
			</div>
		</div>
	);
};

const CartList = ({ cart }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchFullInfo = async () => {
			try {
				const productIds = cart.map(i => i.product);

				const fetchedProductsInfo =
					await productService.getMultipleProductsInfo(productIds);

				const fullCartInfo = fetchedProductsInfo.map(i => {
					const item = cart.find(p => p.product === i._id);

					if (item.amount === -1)
						throw new Error(
							'Something went wrong while trying to fill products info in cart'
						);

					return { ...i, amount: item.amount };
				});

				setProducts(fullCartInfo);
			} catch (err) {
				toast.error(err.message || err);
			}
		};

		fetchFullInfo();
	}, [cart]);

	const onCheckout = () => {
		console.log('checkout!');
	};

	const productCards = products.map((p, i) => (
		<CartProductCard key={p._id} info={p} index={i} cart={cart} />
	));

	return (
		<>
			<h1 className='text-2xl font-bold text-center'>My Cart</h1>
			<div className='w-5/6 grid grid-cols-3 mx-auto'>{productCards}</div>;
			<div className='mx-auto w-40'>
				<button onClick={onCheckout} className='border p-1'>
					Continue to checkout -{'>'}
				</button>
			</div>
		</>
	);
};

export default CartList;
