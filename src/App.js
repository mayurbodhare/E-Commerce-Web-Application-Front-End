import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessfullPage from './pages/orderSuccessPage';
import UserProfile from './features/user/components/UserProfile';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminHomePage from './pages/AdminHomePage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductFormPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><HomePage/></Protected>,
  },

  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHomePage/></ProtectedAdmin>,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },

  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>,
  },

  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>,
  },
  
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>,
  },

  {
    path: "/order-success/:id",
    element: <OrderSuccessfullPage />,
  },
  
  {
    path: "/orders",
    element: <UserOrdersPage />,
  },

  {
    path: "/profile",
    element: <UserProfilePage />,
  },

  {
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },

  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },

]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch,user])
  
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
