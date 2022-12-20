import { getNavLinks } from '../../config/routes';
import Account from './Account';
import CartIcon from './CartIcon';

const Nav = ({ userIsAdmin }) => {
	const navlinks = getNavLinks();

	return (
		<ul className='flex flex-1 items-center'>
			{navlinks}
			<li className='flex items-center justify-end ml-auto mr-10 h-full w-1/2'>
				<Account userIsAdmin={userIsAdmin} />
				<CartIcon />
			</li>
		</ul>
	);
};

export default Nav;
