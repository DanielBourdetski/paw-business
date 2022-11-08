import Home from "../pages/Home";
import LoginRegistration from "../pages/LoginRegistration";
import Products from "../pages/Products";
import Account from "../pages/Account";
import TagProducts from "../pages/TagProducts";
import AddProduct from "../pages/AddProduct";
import Admin from "../pages/Admin";
import EditUser from "../pages/EditUser";
import EditProduct from "../pages/EditProduct";
import CartList from "../pages/Cart";
import Cart from "../pages/Cart";

/**
 * navable: adds a link in the navbar
 * protected: only registered users can access
 * admin: only admins can access
 */

export default [
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
    navable: true,
  },
  {
    path: '/account',
    name: 'My Account',
    element: <Account />,
    protected: true,
    navable: true,
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
    element: <EditUser isAccountUpdate />,
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
    navable: true,
    admin: true,
  },
]