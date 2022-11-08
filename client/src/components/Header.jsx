import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { userActions } from '../store/store';
import FullLogo from './common/Logos';
import Nav from './Nav';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { token, isAdmin } = useSelector(state => state.user);
	const isLogged = !!token;

	const onClick = () => {
		dispatch(userActions.removeUser());
		userService.signout();

		navigate('login');
	};

	return (
		<nav
			className={`w-full h-24 flex items-center bg-cyan-200 ${
				!isLogged ? 'justify-center' : ''
			}`}>
			<div className={`flex h-full items-center `}>
				<FullLogo />
			</div>
			{isLogged && (
				<>
					<Nav userIsAdmin={isAdmin} />
					<button onClick={onClick} className='border border-black rounded'>
						LOGOUT
					</button>
				</>
			)}
		</nav>
	);
};

export default Header;
