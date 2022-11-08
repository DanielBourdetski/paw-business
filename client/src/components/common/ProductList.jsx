import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const ProductList = ({ products, title = '', className }) => {
	const cart = useSelector(state => state.user.cart);
	const ids = cart.map(p => p.product);

	const capitalizedTitle =
		title.slice(0, 1).toUpperCase() + title.slice(1).toLowerCase();

	return (
		<>
			{capitalizedTitle && <h2>{capitalizedTitle}</h2>}
			<ul
				className={`list-none grid grid-cols-2 md:grid-cols-4 w-full ${className}`}>
				{products.map(p => (
					<ProductCard
						key={p._id}
						info={p}
						className=''
						inCart={ids.includes(p._id)}
					/>
				))}
			</ul>
		</>
	);
};

export default ProductList;
