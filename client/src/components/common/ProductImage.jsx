const ProductImage = ({ url, name, className }) => {
	const onImageError = e => {
		e.target.onerror = null; // prevents this function to loop
		e.target.src = process.env.PUBLIC_URL + '/images/Paw-Business-logo.png';
	};

	return (
		<img className={className} src={url} alt={name} onError={onImageError} />
	);
};

export default ProductImage;
