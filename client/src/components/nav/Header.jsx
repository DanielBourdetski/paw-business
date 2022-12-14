import { useSelector } from 'react-redux';
import FullLogo, { Logo } from '../common/Logos';
import HamburgerMenu from './HamburgerMenu';
import Nav from './Nav';

const Header = () => {
	const { token, isAdmin } = useSelector(state => state.user);
	const isLogged = !!token;

	return (
		<>
			<nav
				className={`hidden md:flex w-screen h-24 p-2 z-[100] bg-cyan-200 shadow relative`}>
				<div className={`flex h-full items-center `}>
					<FullLogo />
				</div>
				{isLogged && <Nav userIsAdmin={isAdmin} />}
			</nav>

			<nav className='w-full h-24 flex items-center justify-between p-2 pr-8 md:hidden bg-cyan-200 shadow'>
				<Logo className='ml-4' />
				{isLogged && <HamburgerMenu userIsAdmin={isAdmin} />}
			</nav>
		</>
	);
};

export default Header;
