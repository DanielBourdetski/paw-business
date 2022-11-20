import PasswordResetRequest from '../components/PasswordResetRequest';
import PasswordReset from '../components/PasswordReset';
import { Route, Routes, useParams } from 'react-router-dom';

const ForgotPassword = () => {
	return (
		<Routes>
			<Route path=':resetToken' element={<PasswordReset />} />
			<Route path='/' element={<PasswordResetRequest />} />
		</Routes>
	);
};

export default ForgotPassword;
