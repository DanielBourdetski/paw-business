import { getFooterLinks } from '../../config/routes';
import FullLogo, { Logo } from '../common/Logos';

const Footer = ({ user, isAdmin }) => {
	const linkClassName = 'tracking-wide';
	const links = getFooterLinks(user, isAdmin, linkClassName);

	return (
		<div className='w-screen mt-auto bg-cyan-500 flex items-center justify-start'>
			<div className='h-20 hidden sm:block'>
				<FullLogo />
			</div>
			<div className='sm:hidden h-20 sm:h-20 mx-10 my-5'>
				<Logo />
			</div>
			<div className='grid grid-rows-4 grid-flow-col gap-x-4 p-2'>{links}</div>
		</div>
	);
};

export default Footer;
