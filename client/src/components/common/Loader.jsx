import { Circles } from 'react-loader-spinner';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

const Loader = ({ className }) => {
	return (
		<div
			className={`fixed w-screen h-screen left-0 top-0 flex justify-center z-[55] duration-300 bg-white ${className}`}>
			<Circles
				height='80'
				width='80'
				color='#8C52FF'
				ariaLabel='circles-loading'
				wrapperStyle={{}}
				wrapperClass='mt-80 sm:mt-80'
				visible={true}
			/>
			{!className && <RemoveScrollBar />}
		</div>
	);
};

export default Loader;
