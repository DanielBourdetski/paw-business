const Modal = ({ children }) => {
	return (
		<div
			className={`absolute top-0 right-0 bottom-0 w-screen h-full bg-black bg-opacity-50 flex justify-center items-start pt-32`}>
			{children}
		</div>
	);
};

export default Modal;
