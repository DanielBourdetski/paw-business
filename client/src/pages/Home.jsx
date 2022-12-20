import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartAndFavs from '../components/CartAndFavs';
import RandomProducts from '../components/products/RandomProducts';

const Home = () => {
	const token = useSelector(state => state.user.token);
	const navigate = useNavigate();

	if (!token) return navigate('/login');

	return (
		<>
			<RandomProducts />
			<CartAndFavs />
		</>
	);
};

export default Home;
