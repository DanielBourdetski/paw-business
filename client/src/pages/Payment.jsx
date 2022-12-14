import { useState } from 'react';
import CheckoutStageIndicator from '../components/checkout/CheckoutStageIndicator';
import CartReview from '../components/checkout/CartReview';
import PersonalInfo from '../components/checkout/PersonalInfo';
import FinalSummary from '../components/checkout/FinalSummary';

const Payment = () => {
	const [productsInCart, setProductsInCart] = useState([]);
	const [stage, setStage] = useState(1);
	const [paymentInfo, setPaymentInfo] = useState({
		cardNumber: '5555 5555 5555 4444',
		expiryDate: '12 / 24',
		cvc: '007',
		name: 'Demo Info',
	});

	const onNextStage = () => setStage(stage + 1);
	const onPreviousStage = () => setStage(stage - 1);

	let content;

	if (stage === 1)
		content = (
			<CartReview
				productsInCart={productsInCart}
				setProductsInCart={setProductsInCart}
				onNextStage={onNextStage}
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

export default Payment;
