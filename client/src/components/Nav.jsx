import { NavLink } from 'react-router-dom';
import routes from '../config/routes';

const Nav = ({ userIsAdmin }) => {
	const navlinks = routes.map(r => {
		if (!r.navable) return null;
		if (r.admin && !userIsAdmin) return null;

		return (
			<li key={r.path} className='mx-3'>
				<NavLink
					to={r.path}
					className={({ isActive }) => (isActive ? 'underline' : undefined)}>
					{' '}
					{r.name}
				</NavLink>
			</li>
		);
	});

	return <ul className='flex items-center'>{navlinks}</ul>;
};

export default Nav;
