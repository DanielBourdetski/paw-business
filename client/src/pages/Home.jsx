import { useSelector } from 'react-redux';
import CartAndFavs from '../components/CartAndFavs';
import RandomProducts from '../components/RandomProducts';

const Home = () => {
	const token = useSelector(state => state.user.token);

	if (!token) return null;

	return (
		<>
			<CartAndFavs />
			<RandomProducts />
		</>
	);
};

export default Home;
