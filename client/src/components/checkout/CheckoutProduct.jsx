import ProductImage from '../common/ProductImage';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

const CheckoutProductCard = ({ product, onProductAmountChange }) => {
	return (
		<li className='flex items-center justify-between border border-gray-400 rounded px-6 min-h-[150px]'>
			<div className='w-1/4'>
				<ProductImage
					url={product.image}
					name={product.name}
					className='py-2 w-full'
				/>
			</div>
			<div className='flex flex-col md:justify-evenly md:h-full w-3/4 ml-auto'>
				<div className='flex justify-center mb-4 items-baseline'>
					<h3 className='text-lg mr-1 w-1/2 md:w-full truncate'>
						{product.name}
					</h3>
					<p className='text-sm text-gray-600 flex'>
						{product.price} <span>$</span>
					</p>
				</div>

				<div className='w-2/3 mx-auto relative'>
					<div className='absolute -top-2 h-8 md:h-6 rounded-full w-full border-2 flex justify-between items-center'>
						<div onClick={() => onProductAmountChange(product._id, 'reduce')}>
							<AiFillMinusCircle className='w-6 h-6 font-thin cursor-pointer hover:text-slate-800' />
						</div>
						<div>
							<p className='w-10 h-10 rounded-full border whitespace-nowrap flex justify-center items-center bg-white'>
								x {product.amount}
							</p>
						</div>
						<div onClick={() => onProductAmountChange(product._id, 'add')}>
							<AiFillPlusCircle className='w-6 h-6 font-thin cursor-pointer hover:text-slate-800' />
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default CheckoutProductCard;
