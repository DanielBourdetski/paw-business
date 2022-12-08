import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import userService from './services/userService';
import { setJwt } from './services/httpService';
import routesConfig from './config/routes';

import Header from './components/nav/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/store';
import useHandleError from './hooks/useHandleError';

function App() {
  const [loading, setLoading] = useState(true)  
  const [routes, setRoutes] = useState([])
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleError = useHandleError();

  useEffect(() => {
    const routesArr = routesConfig.map((r, i) => {
      if (r.protected) return <Route key={i} path={r.path} element={<ProtectedRoute adminOnly={r.admin}>{r.element}</ProtectedRoute>} />
      
      return <Route key={i} path={r.path} element={r.element} />
    });
    
    setRoutes(routesArr);

    if (/forgot-password.*/.test(location.pathname)) return setLoading(false);

    const token = userService.getToken();
    if (!token) {
      setLoading(false);
      return navigate('/login');
    }

    setJwt(token);

    const getAccountInfo = async () => {
      try {
        const {name, email, cart, favorites, isAdmin} = await userService.getAccountInfo();
        const fetchedUser = { name, email, cart, favorites, token, isAdmin };

        dispatch(userActions.saveUser(fetchedUser));
      } 
      catch (err) {
        handleError(err, 'get account info')
      } 
      finally {
        setLoading(false);
    }
  }

  getAccountInfo();
  }, [])

  if (loading) return <p>LOADING</p>

  return (
    <>
      <ToastContainer position='bottom-right' />
      <div className=''>
        <Header isLogged={!!user} />
        <div className='w-[85%] mx-auto'>
        <Routes>
          {routes}
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
