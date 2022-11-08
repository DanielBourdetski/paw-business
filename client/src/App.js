import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import userService from './services/userService';
import { setJwt } from './services/httpService';
import routesConfig from './config/routes';

import Header from './components/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/store';

function App() {
  const [loading, setLoading] = useState(true)  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(state => state.user)

  useEffect(() => {
    const token = userService.getToken();
    if (!token) {
      setLoading(false);
      return navigate('/login');
    }

    setJwt(token);

    const getAccountInfo = async () => {
      try {
        const {name, email, cart, favourites, isAdmin} = await userService.getAccountInfo();
        const fetchedUser = { name, email, cart, favourites, token, isAdmin };

        dispatch(userActions.saveUser(fetchedUser));
      } 
        catch (err) {
        console.log(err);
      } 
        finally {
        setLoading(false);
      }
    }

    getAccountInfo();
  }, [])

  const routes = routesConfig.map((r, i) => {
    if (r.protected) return <Route key={i} path={r.path} element={<ProtectedRoute adminOnly={r.admin}>{r.element}</ProtectedRoute>} />
    
    return <Route key={i} path={r.path} element={r.element} />
  });


  if (loading) return <p>LOADING</p>

  return (
    <>
      <ToastContainer position='bottom-right' />
      <div className=''>
        <Header isLogged={!!user} />
        <Routes>
          {routes}
        </Routes>
      </div>
    </>
  );
}

export default App;
