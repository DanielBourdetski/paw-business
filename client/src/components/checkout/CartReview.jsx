import { useEffect } from 'react';
import userService from '../../services/userService';
import CheckoutProductCard from './CheckoutProduct';
import QuickSummary from './QuickSummary';
import { toast } from 'react-toastify';
import useHandleError from '../../hooks/useHandleError';
import { useNavigate } from 'react-router-dom';

const CartReview = ({ onNextStage, productsInCart, setProductsInCart }) => {
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
	}, [productsInCart, setProductsInCart]);

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
		<div className='flex w-[80%] gap-x-4 mx-auto'>
			<ul className='grid grid-col-2 mx-auto gap-y-4 max-w-[80%]'>
				{productsInCart?.map(p => {
					if (p === null || p === undefined) return null;
					return <CheckoutProductCard key={p.name} product={p} />;
				})}
			</ul>
			<QuickSummary onNextStage={onNextStage} total={totalItemsPrice} />
		</div>
	);
};

export default CartReview;
