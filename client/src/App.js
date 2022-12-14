import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import userService from './services/userService';
import { setJwt } from './services/httpService';
import routesConfig from './config/routes';

import Header from './components/nav/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loader from './components/common/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/store';
import useHandleError from './hooks/useHandleError';
import useLoader from './hooks/useLoader';

function App() {
  const [routes, setRoutes] = useState([])
  
  const user = useSelector(state => state.user)
  const loaderClassName = useSelector(state => state.general.loaderClassName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleError = useHandleError();
  const { stopLoading, isInitialLoaded } = useLoader();

  useEffect(() => {
    const routesArr = routesConfig.map((r, i) => {
      if (r.protected) return <Route key={i} path={r.path} element={<ProtectedRoute adminOnly={r.admin}>{r.element}</ProtectedRoute>} />
      
      return <Route key={i} path={r.path} element={r.element} />
    });
    
    setRoutes(routesArr);

    if (/forgot-password.*/.test(location.pathname)) return stopLoading();

    const token = userService.getToken();
    if (!token) {
      stopLoading();
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
        stopLoading();
    }
  }

  getAccountInfo();
  }, [])

  return (
    <>
      <ToastContainer position='bottom-right' />
      <div className='w-screen'>
        <Header isLogged={!!user} />
        <Loader className={loaderClassName} />
        <div className='w-[85%] mx-auto'>
        {isInitialLoaded && <Routes>
          {routes}
        </Routes>}
        </div>
      </div>
    </>
  );
}

export default App;
