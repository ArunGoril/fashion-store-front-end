import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProtecteRoute from './features/auth/components/Protected';
import { fetchCartItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';

// most of the route is protected
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtecteRoute>
      <Home />
    </ProtecteRoute>,
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
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/cart",
    element: <ProtecteRoute>
      <CartPage />
    </ProtecteRoute>,
  },
  {
    path: "/checkout",
    element: <ProtecteRoute>
      <Checkout />
    </ProtecteRoute>,
  },
  {
    path: "/product-details/:id",
    element: <ProtecteRoute>
      <ProductDetailsPage />
    </ProtecteRoute>,
  },
  {
    path: "/order-success/:id",
    element: <ProtecteRoute>
      <OrderSuccessPage />
    </ProtecteRoute>,
  },
  {
    path: "/orders",
    element: <ProtecteRoute>
      <UserOrderPage />
    </ProtecteRoute>,
  },
  {
    path: "/profile",
    element: <ProtecteRoute>
      <UserProfilePage />
    </ProtecteRoute>,
  },
  {
    path: "*", // whild card
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync(user._id));
      dispatch(fetchLoggedInUserAsync(user._id));
    }
  }, [dispatch, user])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
