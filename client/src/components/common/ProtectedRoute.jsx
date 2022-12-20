import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children = false, adminOnly = false }) => {
	const navigate = useNavigate();
	const { name, isAdmin } = useSelector(state => state.user);

	useEffect(() => {
		if (!name) navigate('/login');
		if (adminOnly && !isAdmin) {
			toast.info('You are not authorized to view requested content');
			navigate('/');
		}
	}, [name, isAdmin]);

	if (!name) return null;

	return children;
};

export default ProtectedRoute;
