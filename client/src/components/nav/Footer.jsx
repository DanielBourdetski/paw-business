import { getFooterLinks } from '../../config/routes';
import FullLogo, { Logo } from '../common/Logos';

const Footer = ({ user, isAdmin }) => {
	const linkClassName = 'tracking-wide';
	const links = getFooterLinks(user, isAdmin, linkClassName);

	return (
		<div className='w-screen mt-auto bg-cyan-500 flex items-start'>
			<div className='h-20 hidden sm:block'>
				<FullLogo />
			</div>
			<div className='sm:hidden h-20 my-auto mx-auto'>
				<Logo />
			</div>
			<div className='grid grid-rows-4 grid-flow-col gap-x-4 p-2 justify-center m-4'>
				{links}
			</div>
		</div>
	);
};

export default Footer;
