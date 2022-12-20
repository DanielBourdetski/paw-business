import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { VscOpenPreview } from 'react-icons/vsc';
import { GrClose } from 'react-icons/gr';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import ProductImage from '../common/ProductImage';
import Tags from '../common/Tags';

const ProductCard = ({
	product,
	onEditProduct,
	onDeleteProduct,
	closeInfo,
}) => {
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = event => {
			if (ref.current && !ref.current.contains(event.target)) {
				closeInfo && closeInfo();
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [closeInfo]);

	return (
		<div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
			<RemoveScrollBar />
			<div
				ref={ref}
				className='w-2/3 h-1/2 bg-white flex flex-col items-center p-10 gap-y-6 relative'>
				<div className='w-full flex items-end justify-between'>
					<h2 className='text-xl'>{product.name}</h2>
					<p>{product.price} $</p>
				</div>

				<div className='w-3/4'>
					<ProductImage url={product.image} />
				</div>

				<p className='text-justify'>{product.description}</p>
				<p>Sold: {product._sold}</p>

				<Tags tags={product.tags} />

				<div className='flex justify-center gap-x-4 w-full'>
					<AiOutlineEdit
						className='w-6 h-6'
						onClick={() => onEditProduct(product._id)}
					/>
					<AiOutlineDelete
						className='w-6 h-6'
						onClick={() => onDeleteProduct(product._id)}
					/>
				</div>

				<GrClose className='absolute top-5 right-5' />
			</div>
		</div>
	);
};

const ProductTableMobile = ({
	className,
	products,
	onEditProduct,
	onDeleteProduct,
}) => {
	const [productCard, setProductCard] = useState(null);

	const handleCloseInfo = () => setProductCard(null);

	return (
		<div className=''>
			{productCard && (
				<ProductCard
					product={productCard}
					onEditProduct={onEditProduct}
					onDeleteProduct={onDeleteProduct}
					closeInfo={handleCloseInfo}
				/>
			)}

			<table
				className={`mx-auto w-full p-1 border border-separate ${className}`}>
				<thead className='border'>
					<tr className='font-bold border'>
						<th className='border'>Name</th>
						<th className='border'>Show Info</th>
						<th className='border'>Actions</th>
					</tr>
				</thead>

				<tbody className='border'>
					{products.map(p => {
						return (
							<tr className='border' key={p.name}>
								<td className='border pl-2'>{p.name}</td>
								<td className='flex flex-col p-2 border justify-center items-center'>
									<VscOpenPreview
										className='cursor-pointer'
										onClick={() => setProductCard(p)}
									/>
								</td>
								<td className='border'>
									<div className='flex justify-evenly'>
										<AiOutlineEdit
											className='w-5 h-5'
											onClick={() => onEditProduct(p._id)}
										/>
										<AiOutlineDelete
											className='w-5 h-5'
											onClick={() => onDeleteProduct(p._id)}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTableMobile;
