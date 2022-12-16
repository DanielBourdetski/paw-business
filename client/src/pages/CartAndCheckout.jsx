import { useState } from 'react';
import CheckoutStageIndicator from '../components/checkout/CheckoutStageIndicator';
import CartReview from '../components/checkout/CartReview';
import PersonalInfo from '../components/checkout/PersonalInfo';
import FinalSummary from '../components/checkout/FinalSummary';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import useHandleError from '../hooks/useHandleError';
import { useSelector } from 'react-redux';

const CartAndCheckout = () => {
	const [productsInCart, setProductsInCart] = useState([]);
	const [stage, setStage] = useState(1);
	const [paymentInfo, setPaymentInfo] = useState({
		cardNumber: '5555 5555 5555 4444',
		expiryDate: '12 / 24',
		cvc: '007',
		name: 'Demo Info',
	});

	const cart = useSelector(state => state.user.cart);

	const navigate = useNavigate();
	const handleError = useHandleError();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { fullCartInfo, deletedSome } =
					await userService.getFullCartInfo();

				if (fullCartInfo.length === 0) {
					navigate('/');
					return;
				}

				if (deletedSome)
					toast.info(
						'Some products in your cart had invalid info or were removed from the store, and were remove from your cart.',
						{ autoClose: 3500 }
					);

				setProductsInCart(fullCartInfo);
			} catch (err) {
				handleError(err, 'get product info');
			}
		};

		fetchProducts();
	}, [cart]);

	const onNextStage = () => setStage(stage + 1);
	const onPreviousStage = () => setStage(stage - 1);

	let content;

	if (stage === 1)
		content = (
			<CartReview
				productsInCart={productsInCart}
				onNextStage={onNextStage}
				cart={cart}
			/>
		);

	if (stage === 2)
		content = (
			<PersonalInfo
				onNextStage={onNextStage}
				onPreviousStage={onPreviousStage}
				paymentState={{ paymentInfo, setPaymentInfo }}
			/>
		);

	if (stage === 3)
		content = (
			<FinalSummary
				info={paymentInfo}
				cart={productsInCart}
				onPreviousStage={onPreviousStage}
				paymentInfo={paymentInfo}
			/>
		);

	return (
		<div>
			<CheckoutStageIndicator previousStage={onPreviousStage} stage={stage} />

			{content}
		</div>
	);
};

export default CartAndCheckout;
