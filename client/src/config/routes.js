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
import { NavLink } from "react-router-dom";

/**
 * navable: adds link to nav
 * mobile: adds link to mobile nav
 * name: link name in navbar
 * protected: only registered users can access
 * admin: only admins can access
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
  },
  {
    path: '/registration',
    element: <LoginRegistration />,
  },
  {
    path: '/products/by-tags/:tag',
    element: <TagProducts />,
    protected: true,
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
    protected: true,
    admin: true,
  },
  {
    path: '/edit-product/:id',
    element: <EditProduct />,
    protected: true,
    admin: true,
  },
  {
    path: '/edit-user/:id',
    element: <EditUser />,
    protected: true,
    admin: true,
  },
  {
    path: '/update-account',
    element: <EditUser />,
    protected: true
  },
  {
    path: '/cart',
    name: 'Cart',
    element: <CartAndCheckout />,
    navable: true,
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
  },
  {
    path: '/cart',
    element: <CartAndCheckout />,
    protected: true
  }
]

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