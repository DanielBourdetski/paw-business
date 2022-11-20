import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children = false, adminOnly = false }) => {
	const navigate = useNavigate();
	const user = useSelector(state => state.user);

	useEffect(() => {
		if (!user.name) navigate('/login');
		if (adminOnly && !user.isAdmin) navigate('/');
	}, [user]);

	if (!user) return null;

	return children;
};

export default ProtectedRoute;
