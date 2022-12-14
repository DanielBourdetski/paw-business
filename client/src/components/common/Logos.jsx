import { useNavigate } from 'react-router-dom';

export const Logo = ({ className }) => {
	const navigate = useNavigate();

	return (
		<img
			className={`h-3/4 cursor-pointer ${className}`}
			src={process.env.PUBLIC_URL + '/images/Paw-Business-logo.png'}
			alt='logo of paw business'
			onClick={() => navigate('/')}
		/>
	);
};

export const Name = ({ className = '' }) => {
	const navigate = useNavigate();

	return (
		<img
			className={`h-[45%] cursor-pointer aspect-auto ${className}`}
			src={process.env.PUBLIC_URL + '/images/Paw-Business-name.png'}
			alt='stylized name of Paw Business'
			onClick={() => navigate('/')}
		/>
	);
};

export const FullLogo = ({ logoClasses, nameClasses, className = '' }) => {
	return (
		<div
			className={'flex items-center h-full gap-x-4 my-0 mx-4 p-0 ' + className}>
			<Logo className={logoClasses} />
			<Name className={nameClasses} />
		</div>
	);
};

export default FullLogo;
