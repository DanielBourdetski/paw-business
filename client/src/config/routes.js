import Home from "../pages/Home";
import LoginRegistration from "../pages/LoginRegistration";
import Products from "../pages/Products";
import Account from "../pages/Account";
import TagProducts from "../pages/TagProducts";
import AddProduct from "../pages/AddProduct";
import Admin from "../pages/Admin";
import EditUser from "../pages/EditUser";
import EditProduct from "../pages/EditProduct";
import ForgotPassword from "../pages/ForgotPassword";
import CartAndCheckout from "../pages/CartAndCheckout";
import { Link, NavLink } from "react-router-dom";
import NotFound from "../pages/NotFound";
import About from "../pages/About";

/**
 * navable: adds link to nav
 * mobile: adds link to mobile nav
 * name: link name in navbar and/or footer
 * protected: only registered users can access
 * admin: only admins can access
 * noNav: indicates path is not to be used as link
 */

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
    protected: true,
    navable: true,
    mobile: true
  },
  {
    path: '/login',
    element: <LoginRegistration />,
    name: 'Login'
  },
  {
    path: '/registration',
    element: <LoginRegistration />,
    name: 'Registration'
  },
  {
    path: '/products',
    name: 'Products',
    element: <Products />,
    protected: true,
    navable: true,
    mobile: true
  },
  {
    path: '/products/:search',
    name: 'Products',
    element: <Products />,
    protected: true,
    noNav: true
  },
  {
    path: '/account',
    name: 'My Account',
    element: <Account />,
    protected: true,
    mobile: true
  },
  {
    path: '/add-product',
    element: <AddProduct />,
    name: 'Add Product',
    protected: true,
    admin: true,
  },
  {
    path: '/edit-product/:id',
    element: <EditProduct />,
    protected: true,
    admin: true,
    noNav: true,
  },
  {
    path: '/edit-user/:id',
    element: <EditUser />,
    protected: true,
    admin: true,
    noNav: true
  },
  {
    path: '/update-account',
    name: 'Update Account',
    element: <EditUser />,
    protected: true
  },
  {
    path: '/cart',
    name: 'Cart',
    element: <CartAndCheckout />,
    protected: true,
    mobile: true
  },
  {
    path: '/admin',
    name: 'Admin Panel',
    element: <Admin />,
    protected: true,
    admin: true,
    mobile: true
  },
  {
    path: '/forgot-password/*',
    element: <ForgotPassword />,
    noNav: true,
  },
  {
    path: '/about',
    name: 'About',
    element: <About />,
    mobile: true,
    navable: true
  },
  {
    path: '*',
    element: <NotFound />,
    noNav: true
  }
]

export const getFooterLinks = (user, isAdmin, className) => {
  const useableRoutes = routes.filter(r => !r.noNav);
  let footerRoutes;


  if (!user) footerRoutes = useableRoutes.filter(r => !r.protected); 
  else if (user && !isAdmin) footerRoutes = useableRoutes.filter(r => (r.protected || r.navable) && !r.admin);
  else footerRoutes = useableRoutes.filter(r => r.protected || r.navable);

  const footerLinks = footerRoutes.map(r => <Link key={r.path} to={r.path} className={className}>{r.name}</Link>)
  return footerLinks;
}

export const getMobileNavLinks = userIsAdmin => routes.map(r => {
  if (!r.mobile) return null;
  if (r.admin && !userIsAdmin) return null;

  return (
    <li key={r.path} className='text-center'>
      <NavLink
        to={r.path}
        className={({ isActive }) =>
          `px-4 py-2 rounded-full hover:shadow-sm hover:shadow-primary duration-100 ${
            isActive
              ? 'shadow-sm border border-x-2 border-primary'
              : undefined
          }`
        }>
        {' '}
        {r.name}
      </NavLink>
    </li>
  );
});

export const getNavLinks = userIsAdmin => routes.map(r => {
  if (!r.navable) return null;
  if (r.admin && !userIsAdmin) return null;

  return (
    <li key={r.path} className='mx-3'>
      <NavLink
        to={r.path}
        className={({ isActive }) =>
          `px-4 py-2 rounded-full hover:shadow-sm hover:shadow-primary duration-100 ${
            isActive
              ? 'shadow-sm border border-x-2 border-primary'
              : undefined
          }`
        }>
        {' '}
        {r.name}
      </NavLink>
    </li>
  );
});

export default routes