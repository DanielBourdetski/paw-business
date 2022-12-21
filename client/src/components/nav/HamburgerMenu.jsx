import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { getMobileNavLinks } from '../../config/routes';
import userService from '../../services/userService';
import { userActions } from '../../store/store';

const HamburgerMenu = ({ userIsAdmin }) => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const dispatch = useDispatch();

	const mobileLinks = getMobileNavLinks(userIsAdmin);

	const handleMenuToggle = () => setMenuOpen(!isMenuOpen);

	console.log(isMenuOpen);

	const handleLogout = () => {
		handleMenuToggle();
		userService.signout();
		dispatch(userActions.removeUser());
	};

	return (
		<div className='relative'>
			<BsList onClick={handleMenuToggle} className='w-8 h-8 cursor-pointer' />
			<ul
				onClick={handleMenuToggle}
				className={`absolute w-40 gap-y-4 rounded-lg backdrop-blur-md flex flex-col items-center justify-center top-20 -right-60 duration-150 z-10 bg-purple-900 bg-opacity-20 p-4 ${
					isMenuOpen && 'right-1'
				}`}>
				{mobileLinks}
				<li>
					<button
						onClick={() => {
							handleLogout();
							setMenuOpen(false);
						}}
						className='text-sm border border-slate-500 rounded px-2'>
						Logout
					</button>
				</li>
			</ul>
		</div>
	);
};

export default HamburgerMenu;
