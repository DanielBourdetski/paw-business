import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { VscOpenPreview } from 'react-icons/vsc';
import { GrClose } from 'react-icons/gr';
import ProductImage from '../common/ProductImage';
import Tags from '../common/Tags';
import Modal from '../common/Modal';

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
		<Modal>
			<div
				ref={ref}
				className='w-2/3 bg-white flex flex-col items-center p-10 gap-y-4 relative'>
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
						className='w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200'
						onClick={() => onEditProduct(product._id)}
					/>
					<AiOutlineDelete
						className='w-6 h-6 cursor-pointer rounded-full hover:bg-slate-200'
						onClick={() => onDeleteProduct(product._id)}
					/>
				</div>

				<GrClose onClick={closeInfo} className='absolute top-5 right-5' />
			</div>
		</Modal>
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
		<div className='md:hidden'>
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
											className='w-5 h-5 cursor-pointer rounded-full hover:bg-slate-200'
											onClick={() => onEditProduct(p._id)}
										/>
										<AiOutlineDelete
											className='w-5 h-5 cursor-pointer rounded-full hover:bg-slate-200'
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
