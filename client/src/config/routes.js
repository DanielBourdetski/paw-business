import Home from "../pages/Home";
import LoginRegistration from "../pages/LoginRegistration";
import Products from "../pages/Products";
import Account from "../pages/Account";
import TagProducts from "../pages/TagProducts";
import AddProduct from "../pages/AddProduct";
import Admin from "../pages/Admin";
import EditUser from "../pages/EditUser";
import EditProduct from "../pages/EditProduct";
import Cart from "../pages/Cart";
import ForgotPassword from "../pages/ForgotPassword";
import Payment from "../pages/Payment";

/**
 * navable: adds a link in the navbar
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
    element: <Cart />,
    navable: true,
    protected: true,
  },
  {
    path: '/admin',
    name: 'Admin Panel',
    element: <Admin />,
    protected: true,
    admin: true,
  },
  {
    path: '/forgot-password/*',
    element: <ForgotPassword />,
  },
  {
    path: '/checkout',
    element: <Payment />,
    protected: true
  }
]

export default routes