import CheckoutProductCard from './CheckoutProduct';
import QuickSummary from './QuickSummary';
import useHandleError from '../../hooks/useHandleError';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../../services/userService';
import { userActions } from '../../store/store';

const CartReview = ({ onNextStage, productsInCart, cart }) => {
	const handleError = useHandleError();
	const dispatch = useDispatch();

	const onProductAmountChange = async (id, action) => {
		try {
			const updatedProductInfo = await userService.addOrReduceInCart(
				action,
				id
			);
			const productIndexInCart = cart.findIndex(
				p => p.product === updatedProductInfo.product
			);

			console.log(updatedProductInfo);

			const updatedCart = [...cart];
			updatedCart[productIndexInCart] = updatedProductInfo;

			dispatch(userActions.updateCart(updatedCart));
		} catch (err) {
			handleError(err, 'add product amount');
		}
	};

	let totalItemsPrice;
	try {
		totalItemsPrice = productsInCart?.reduce(
			(sum, item) => sum + item.amount * item.price,
			0
		);
	} catch (err) {
		handleError(err, 'handle cart items');
	}

	return (
		<div className='flex flex-col-reverse md:flex-row w-full md:w-[80%] gap-x-4 mx-auto'>
			<ul className='flex flex-col mx-auto gap-y-4 mb-10'>
				{productsInCart?.map(p => {
					if (p === null || p === undefined) return null;
					return (
						<CheckoutProductCard
							key={p.name}
							product={p}
							onProductAmountChange={onProductAmountChange}
						/>
					);
				})}
			</ul>
			<QuickSummary onNextStage={onNextStage} total={totalItemsPrice} />
		</div>
	);
};

export default CartReview;
