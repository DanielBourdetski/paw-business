import { NavLink } from 'react-router-dom';
import routes from '../../config/routes';
import Account from './Account';

const Nav = ({ userIsAdmin }) => {
	const navlinks = routes.map(r => {
		if (!r.navable) return null;
		if (r.admin && !userIsAdmin) return null;

		return (
			<li key={r.path} className='mx-3'>
				<NavLink
					to={r.path}
					className={({ isActive }) =>
						`px-4 py-2 rounded-full hover:shadow-sm hover:shadow-primary duration-100 ${
							isActive
								? 'shadow-sm border border-x-2 border-primary'
								: undefined
						}`
					}>
					{' '}
					{r.name}
				</NavLink>
			</li>
		);
	});

	return (
		<ul className='flex flex-1 items-center'>
			{navlinks}
			<Account userIsAdmin={userIsAdmin} />
		</ul>
	);
};

export default Nav;
