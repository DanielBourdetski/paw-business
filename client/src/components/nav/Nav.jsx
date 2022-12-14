import { getNavLinks } from '../../config/routes';
import Account from './Account';

const Nav = ({ userIsAdmin }) => {
	const navlinks = getNavLinks();

	return (
		<ul className='flex flex-1 items-center'>
			{navlinks}
			<Account userIsAdmin={userIsAdmin} />
		</ul>
	);
};

export default Nav;
